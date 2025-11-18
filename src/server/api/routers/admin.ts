import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { cuidSchema, emailSchema, slugSchema } from "@/server/api/validators";

export const adminRouter = createTRPCRouter({
  // List all clubs
  listClubs: adminProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).default(50),
        cursor: cuidSchema.optional(),
        search: z.string().optional(),
        isActive: z.enum(["active", "inactive", "all"]).default("all"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const whereConditions: {
        OR?: Array<{
          name?: { contains: string; mode: "insensitive" };
          slug?: { contains: string; mode: "insensitive" };
        }>;
        isActive?: boolean;
      } = {};

      // Add search condition
      if (input.search) {
        whereConditions.OR = [
          {
            name: { contains: input.search, mode: "insensitive" as const },
          },
          {
            slug: { contains: input.search, mode: "insensitive" as const },
          },
        ];
      }

      // Add isActive filter
      if (input.isActive === "active") {
        whereConditions.isActive = true;
      } else if (input.isActive === "inactive") {
        whereConditions.isActive = false;
      }
      // "all" means no filter on isActive

      const whereClause =
        Object.keys(whereConditions).length > 0 ? whereConditions : undefined;

      const clubs = await ctx.db.club.findMany({
        where: whereClause,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: [{ name: "asc" }],
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              members: true,
              campaigns: true,
              subscribers: true,
            },
          },
        },
      });

      // Sort case-insensitively in JavaScript
      const sortedClubs = clubs.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      );

      let nextCursor: string | undefined = undefined;
      if (sortedClubs.length > input.limit) {
        const nextItem = sortedClubs.pop();
        nextCursor = nextItem?.id;
      }

      return {
        clubs: sortedClubs,
        nextCursor,
      };
    }),

  // Get club stats
  getClubStats: adminProcedure.query(async ({ ctx }) => {
    const [activeClubs, totalMembers, totalSubscribers, totalCampaigns] =
      await Promise.all([
        ctx.db.club.count({ where: { isActive: true } }),
        ctx.db.clubMember.count(),
        ctx.db.subscriber.count({ where: { status: "SUBSCRIBED" } }),
        ctx.db.campaign.count(),
      ]);

    return {
      activeClubs,
      totalMembers,
      totalSubscribers,
      totalCampaigns,
    };
  }),

  // Get a specific club
  getClub: adminProcedure
    .input(z.object({ clubId: cuidSchema }))
    .query(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          settings: true,
          _count: {
            select: {
              emailLists: true,
              campaigns: true,
              subscribers: true,
            },
          },
        },
      });

      if (!club) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      return club;
    }),

  // Create a new club
  createClub: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        slug: slugSchema,
        gryphlifeId: z.string().optional(),
        organizationEmail: emailSchema.optional(),
        primaryContactEmails: z.array(emailSchema).min(1).max(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if slug already exists
      const existingClub = await ctx.db.club.findUnique({
        where: { slug: input.slug },
      });

      if (existingClub) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A club with this slug already exists",
        });
      }

      // Create club and related records in a transaction
      const club = await ctx.db.$transaction(async (tx) => {
        // Create the club
        const newClub = await tx.club.create({
          data: {
            name: input.name,
            slug: input.slug,
            gryphlifeId: input.gryphlifeId,
            organizationEmail: input.organizationEmail,
            createdById: ctx.session.user.id,
          },
        });

        // Create default club settings
        await tx.clubSettings.create({
          data: {
            clubId: newClub.id,
            fromName: input.name,
            replyToEmail: input.organizationEmail,
          },
        });

        // Create default email list
        await tx.emailList.create({
          data: {
            clubId: newClub.id,
            name: "Main List",
            description: "Default email list for all club members",
            isDefault: true,
          },
        });

        // Process primary contacts
        for (const email of input.primaryContactEmails) {
          // Find or create user
          let user = await tx.user.findUnique({
            where: { email },
          });

          // Create stub user if none exists
          user ??= await tx.user.create({
            data: {
              id: `stub_${Date.now()}_${Math.random()}`,
              email,
              name: email.split("@")[0] ?? "User",
              emailVerified: false,
            },
          });

          // Add as club owner
          await tx.clubMember.create({
            data: {
              clubId: newClub.id,
              userId: user.id,
              role: "CLUB_OWNER",
            },
          });
        }

        return newClub;
      });

      return club;
    }),

  // Update a club
  updateClub: adminProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        name: z.string().min(1).max(255).optional(),
        slug: z
          .string()
          .min(1)
          .max(255)
          .regex(/^[a-z0-9-]+$/)
          .optional(),
        gryphlifeId: z.string().optional(),
        organizationEmail: emailSchema.optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, ...updateData } = input;

      // If slug is being updated, check for conflicts
      if (updateData.slug) {
        const existingClub = await ctx.db.club.findFirst({
          where: {
            slug: updateData.slug,
            NOT: { id: clubId },
          },
        });

        if (existingClub) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A club with this slug already exists",
          });
        }
      }

      const club = await ctx.db.club.update({
        where: { id: clubId },
        data: updateData,
        include: {
          _count: {
            select: {
              members: true,
              campaigns: true,
              subscribers: true,
            },
          },
        },
      });

      return club;
    }),

  // Delete a club
  deleteClub: adminProcedure
    .input(z.object({ clubId: cuidSchema }))
    .mutation(async ({ ctx, input }) => {
      // This will cascade delete all related records due to Prisma schema
      await ctx.db.club.delete({
        where: { id: input.clubId },
      });

      return { success: true };
    }),

  // Deactivate a club
  deactivateClub: adminProcedure
    .input(z.object({ clubId: cuidSchema }))
    .mutation(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
      });

      if (!club) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      if (!club.isActive) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Club is already inactive",
        });
      }

      // Get or create the CSA clubs admin user
      const csaEmail = "csaclubs@uoguelph.ca";
      let csaUser = await ctx.db.user.findUnique({
        where: { email: csaEmail },
      });

      if (!csaUser) {
        // Use a deterministic ID based on email to avoid conflicts
        const csaUserId = `csa_admin_${csaEmail.replace(/[@.]/g, "_")}`;
        csaUser = await ctx.db.user.create({
          data: {
            id: csaUserId,
            email: csaEmail,
            name: "CSA Clubs Admin",
            emailVerified: false,
          },
        });
      }

      // Deactivate the club and reset staff
      await ctx.db.$transaction(async (tx) => {
        // Deactivate the club
        await tx.club.update({
          where: { id: input.clubId },
          data: { isActive: false },
        });

        // Remove all staff members
        await tx.clubMember.deleteMany({
          where: { clubId: input.clubId },
        });

        // Set CSA admin as the only owner
        await tx.clubMember.create({
          data: {
            clubId: input.clubId,
            userId: csaUser.id,
            role: "CLUB_OWNER",
          },
        });
      });

      return { success: true };
    }),

  // Reactivate a deactivated club
  reactivateClub: adminProcedure
    .input(z.object({ clubId: cuidSchema }))
    .mutation(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
      });

      if (!club) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      if (club.isActive) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Club is already active",
        });
      }

      // Reactivate the club
      await ctx.db.club.update({
        where: { id: input.clubId },
        data: { isActive: true },
      });

      return { success: true };
    }),

  // Import clubs from CSV
  importClubsFromCSV: adminProcedure
    .input(
      z.object({
        clubs: z.array(
          z.object({
            name: z.string().min(1).max(255),
            slug: z
              .string()
              .min(1)
              .max(255)
              .regex(/^[a-z0-9-]+$/),
            gryphlifeId: z.string().optional(),
            organizationEmail: emailSchema.optional(),
            primaryContactEmails: z.array(emailSchema).min(1).max(10),
            replaceStaff: z.boolean().default(true),
            isActive: z.boolean().default(true),
          }),
        ),
        deactivateClubsNotListed: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const results = {
        created: [] as string[],
        updated: [] as string[],
        errors: [] as { slug: string; error: string }[],
        deactivated: [] as string[],
      };

      for (const clubData of input.clubs) {
        try {
          // Check if club exists
          const existingClub = await ctx.db.club.findUnique({
            where: { slug: clubData.slug },
            include: {
              members: {
                where: {
                  role: "CLUB_OWNER",
                },
              },
            },
          });

          if (existingClub) {
            // Update existing club
            await ctx.db.$transaction(async (tx) => {
              // Update club info
              await tx.club.update({
                where: { id: existingClub.id },
                data: {
                  name: clubData.name,
                  gryphlifeId: clubData.gryphlifeId,
                  organizationEmail: clubData.organizationEmail,
                  isActive: clubData.isActive,
                },
              });

              // Replace staff if requested
              if (clubData.replaceStaff) {
                // Remove existing club owners
                await tx.clubMember.deleteMany({
                  where: {
                    clubId: existingClub.id,
                    role: "CLUB_OWNER",
                  },
                });

                // Add new primary contacts
                for (const email of clubData.primaryContactEmails) {
                  // Find or create user
                  let user = await tx.user.findUnique({
                    where: { email },
                  });

                  // Create stub user if none exists
                  user ??= await tx.user.create({
                    data: {
                      id: `stub_${Date.now()}_${Math.random()}`,
                      email,
                      name: email.split("@")[0] ?? "User",
                      emailVerified: false,
                    },
                  });

                  // Add as club owner
                  await tx.clubMember.upsert({
                    where: {
                      clubId_userId: {
                        clubId: existingClub.id,
                        userId: user.id,
                      },
                    },
                    create: {
                      clubId: existingClub.id,
                      userId: user.id,
                      role: "CLUB_OWNER",
                    },
                    update: {
                      role: "CLUB_OWNER",
                    },
                  });
                }
              }
            });

            results.updated.push(clubData.slug);
          } else {
            // Create new club
            await ctx.db.$transaction(async (tx) => {
              // Create the club
              const newClub = await tx.club.create({
                data: {
                  name: clubData.name,
                  slug: clubData.slug,
                  gryphlifeId: clubData.gryphlifeId,
                  organizationEmail: clubData.organizationEmail,
                  isActive: clubData.isActive,
                  createdById: ctx.session.user.id,
                },
              });

              // Create default club settings
              await tx.clubSettings.create({
                data: {
                  clubId: newClub.id,
                  fromName: clubData.name,
                  replyToEmail: clubData.organizationEmail,
                },
              });

              // Create default email list
              await tx.emailList.create({
                data: {
                  clubId: newClub.id,
                  name: "Main List",
                  description: "Default email list for all club members",
                  isDefault: true,
                },
              });

              // Add primary contacts
              for (const email of clubData.primaryContactEmails) {
                // Find or create user
                let user = await tx.user.findUnique({
                  where: { email },
                });

                // Create stub user if none exists
                user ??= await tx.user.create({
                  data: {
                    id: `stub_${Date.now()}_${Math.random()}`,
                    email,
                    name: email.split("@")[0] ?? "User",
                    emailVerified: false,
                  },
                });

                // Add as club owner
                await tx.clubMember.create({
                  data: {
                    clubId: newClub.id,
                    userId: user.id,
                    role: "CLUB_OWNER",
                  },
                });
              }
            });

            results.created.push(clubData.slug);
          }
        } catch (error) {
          results.errors.push({
            slug: clubData.slug,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      // If deactivateClubsNotListed is enabled, deactivate all clubs not in the import
      if (input.deactivateClubsNotListed) {
        const importedSlugs = new Set(input.clubs.map((c) => c.slug));

        // Find all active clubs not in the imported list
        const clubsToDeactivate = await ctx.db.club.findMany({
          where: {
            isActive: true,
            slug: {
              notIn: Array.from(importedSlugs),
            },
          },
        });

        // Get or create the CSA clubs admin user
        const csaEmail = "csaclubs@uoguelph.ca";
        let csaUser = await ctx.db.user.findUnique({
          where: { email: csaEmail },
        });

        if (!csaUser) {
          // Use a deterministic ID based on email to avoid conflicts
          const csaUserId = `csa_admin_${csaEmail.replace(/[@.]/g, "_")}`;
          csaUser = await ctx.db.user.create({
            data: {
              id: csaUserId,
              email: csaEmail,
              name: "CSA Clubs Admin",
              emailVerified: false,
            },
          });
        }

        // Deactivate each club and reset staff
        for (const club of clubsToDeactivate) {
          try {
            await ctx.db.$transaction(async (tx) => {
              // Deactivate the club
              await tx.club.update({
                where: { id: club.id },
                data: { isActive: false },
              });

              // Remove all staff members
              await tx.clubMember.deleteMany({
                where: { clubId: club.id },
              });

              // Set CSA admin as the only owner
              await tx.clubMember.create({
                data: {
                  clubId: club.id,
                  userId: csaUser.id,
                  role: "CLUB_OWNER",
                },
              });
            });

            results.deactivated.push(club.slug);
          } catch (error) {
            results.errors.push({
              slug: club.slug,
              error: `Failed to deactivate: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            });
          }
        }
      }

      return results;
    }),

  // Get all scheduled campaigns across the system (for admin calendar view)
  getAllScheduledCampaigns: adminProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: {
        status: "SCHEDULED";
        scheduledFor?: {
          gte?: Date;
          lte?: Date;
        };
      } = {
        status: "SCHEDULED",
      };

      // Add date range filter if provided
      if (input.startDate || input.endDate) {
        where.scheduledFor = {};
        if (input.startDate) {
          where.scheduledFor.gte = input.startDate;
        }
        if (input.endDate) {
          where.scheduledFor.lte = input.endDate;
        }
      }

      const campaigns = await ctx.db.campaign.findMany({
        where,
        orderBy: { scheduledFor: "asc" },
        include: {
          club: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          emailList: {
            select: {
              id: true,
              name: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              emails: true,
            },
          },
        },
      });

      return campaigns;
    }),
});
