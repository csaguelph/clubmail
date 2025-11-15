import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  // List all clubs
  listClubs: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const clubs = await ctx.db.club.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
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

      let nextCursor: string | undefined = undefined;
      if (clubs.length > input.limit) {
        const nextItem = clubs.pop();
        nextCursor = nextItem?.id;
      }

      return {
        clubs,
        nextCursor,
      };
    }),

  // Get a specific club
  getClub: adminProcedure
    .input(z.object({ clubId: z.string() }))
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
        slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
        primaryContactEmails: z.array(z.string().email()).min(1).max(5),
      })
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
            createdById: ctx.session.user.id,
          },
        });

        // Create default club settings
        await tx.clubSettings.create({
          data: {
            clubId: newClub.id,
            fromName: input.name,
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

          if (!user) {
            // Create stub user - they'll complete registration via invite
            user = await tx.user.create({
              data: {
                id: `stub_${Date.now()}_${Math.random()}`,
                email,
                name: email.split("@")[0] ?? "User",
                emailVerified: false,
              },
            });
          }

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
        clubId: z.string(),
        name: z.string().min(1).max(255).optional(),
        slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/).optional(),
        isActive: z.boolean().optional(),
      })
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
    .input(z.object({ clubId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // This will cascade delete all related records due to Prisma schema
      await ctx.db.club.delete({
        where: { id: input.clubId },
      });

      return { success: true };
    }),
});
