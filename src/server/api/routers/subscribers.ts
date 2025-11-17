import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  checkClubPermission,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const subscribersRouter = createTRPCRouter({
  // List subscribers for a club
  listSubscribers: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        listId: z.string().optional(),
        status: z.enum(["SUBSCRIBED", "UNSUBSCRIBED", "BOUNCED"]).optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);
      const where: {
        clubId: string;
        status?: "SUBSCRIBED" | "UNSUBSCRIBED" | "BOUNCED";
        listMemberships?: { some: { emailListId: string } };
      } = {
        clubId: input.clubId,
      };

      if (input.status) {
        where.status = input.status;
      }

      if (input.listId) {
        where.listMemberships = {
          some: {
            emailListId: input.listId,
          },
        };
      }

      const subscribers = await ctx.db.subscriber.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          listMemberships: {
            include: {
              emailList: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      let nextCursor: string | undefined = undefined;
      if (subscribers.length > input.limit) {
        const nextItem = subscribers.pop();
        nextCursor = nextItem?.id;
      }

      return {
        subscribers,
        nextCursor,
      };
    }),

  // Get subscriber count
  getSubscriberCount: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        listId: z.string().optional(),
        status: z.enum(["SUBSCRIBED", "UNSUBSCRIBED", "BOUNCED"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);
      const where: {
        clubId: string;
        status?: "SUBSCRIBED" | "UNSUBSCRIBED" | "BOUNCED";
        listMemberships?: { some: { emailListId: string } };
      } = {
        clubId: input.clubId,
      };

      if (input.status) {
        where.status = input.status;
      }

      if (input.listId) {
        where.listMemberships = {
          some: {
            emailListId: input.listId,
          },
        };
      }

      const count = await ctx.db.subscriber.count({ where });

      return count;
    }),

  // Create a single subscriber
  createSubscriber: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        email: z.string().email(),
        name: z.string().optional().nullable(),
        listIds: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check permissions after input validation
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Check if subscriber already exists
      const existing = await ctx.db.subscriber.findUnique({
        where: {
          clubId_email: {
            clubId: input.clubId,
            email: input.email,
          },
        },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A subscriber with this email already exists",
        });
      }

      // Get list IDs (default to default list if none provided)
      let listIds = input.listIds;
      if (!listIds || listIds.length === 0) {
        const defaultList = await ctx.db.emailList.findFirst({
          where: {
            clubId: input.clubId,
            isDefault: true,
          },
        });

        if (defaultList) {
          listIds = [defaultList.id];
        } else {
          listIds = [];
        }
      }

      // Create subscriber with list memberships in a transaction
      const subscriber = await ctx.db.$transaction(async (tx) => {
        const newSubscriber = await tx.subscriber.create({
          data: {
            clubId: input.clubId,
            email: input.email,
            name: input.name,
            status: "SUBSCRIBED",
          },
        });

        // Add to lists
        for (const listId of listIds) {
          // Verify list belongs to club
          const list = await tx.emailList.findFirst({
            where: {
              id: listId,
              clubId: input.clubId,
            },
          });

          if (list) {
            await tx.subscriberListMembership.create({
              data: {
                subscriberId: newSubscriber.id,
                emailListId: listId,
              },
            });
          }
        }

        return newSubscriber;
      });

      return subscriber;
    }),

  // Bulk import subscribers from CSV data
  bulkImport: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        listId: z.string(),
        subscribers: z.array(
          z.object({
            email: z.string().email(),
            name: z.string().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);
      // Verify list belongs to club
      const list = await ctx.db.emailList.findFirst({
        where: {
          id: input.listId,
          clubId: input.clubId,
        },
      });

      if (!list) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email list not found",
        });
      }

      const results = {
        created: 0,
        updated: 0,
        skipped: 0,
        errors: [] as string[],
      };

      // Process each subscriber
      for (const sub of input.subscribers) {
        try {
          const existing = await ctx.db.subscriber.findUnique({
            where: {
              clubId_email: {
                clubId: input.clubId,
                email: sub.email,
              },
            },
          });

          if (existing) {
            // Update name if provided and subscriber is still subscribed
            if (sub.name && existing.status === "SUBSCRIBED") {
              await ctx.db.subscriber.update({
                where: { id: existing.id },
                data: { name: sub.name },
              });
              results.updated++;
            } else {
              results.skipped++;
            }

            // Ensure they're in the list
            const membership = await ctx.db.subscriberListMembership.findUnique(
              {
                where: {
                  subscriberId_emailListId: {
                    subscriberId: existing.id,
                    emailListId: input.listId,
                  },
                },
              },
            );

            if (!membership) {
              await ctx.db.subscriberListMembership.create({
                data: {
                  subscriberId: existing.id,
                  emailListId: input.listId,
                },
              });
            }
          } else {
            // Create new subscriber
            const newSubscriber = await ctx.db.subscriber.create({
              data: {
                clubId: input.clubId,
                email: sub.email,
                name: sub.name,
                status: "SUBSCRIBED",
              },
            });

            // Add to list
            await ctx.db.subscriberListMembership.create({
              data: {
                subscriberId: newSubscriber.id,
                emailListId: input.listId,
              },
            });

            results.created++;
          }
        } catch (error) {
          results.errors.push(
            `Failed to import ${sub.email}: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }

      return results;
    }),

  // Update a subscriber
  updateSubscriber: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        subscriberId: z.string(),
        name: z.string().optional().nullable(),
        status: z.enum(["SUBSCRIBED", "UNSUBSCRIBED", "BOUNCED"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);
      const { clubId, subscriberId, ...updateData } = input;

      // Verify subscriber belongs to club
      const subscriber = await ctx.db.subscriber.findFirst({
        where: {
          id: subscriberId,
          clubId,
        },
      });

      if (!subscriber) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscriber not found",
        });
      }

      const updated = await ctx.db.subscriber.update({
        where: { id: subscriberId },
        data: updateData,
      });

      return updated;
    }),

  // Delete a subscriber
  deleteSubscriber: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        subscriberId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);
      // Verify subscriber belongs to club
      const subscriber = await ctx.db.subscriber.findFirst({
        where: {
          id: input.subscriberId,
          clubId: input.clubId,
        },
      });

      if (!subscriber) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscriber not found",
        });
      }

      await ctx.db.subscriber.delete({
        where: { id: input.subscriberId },
      });

      return { success: true };
    }),

  // Export subscribers as CSV data
  exportSubscribers: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        listId: z.string().optional(),
        status: z.enum(["SUBSCRIBED", "UNSUBSCRIBED", "BOUNCED"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);
      const where: {
        clubId: string;
        status?: "SUBSCRIBED" | "UNSUBSCRIBED" | "BOUNCED";
        listMemberships?: { some: { emailListId: string } };
      } = {
        clubId: input.clubId,
      };

      if (input.status) {
        where.status = input.status;
      }

      if (input.listId) {
        where.listMemberships = {
          some: {
            emailListId: input.listId,
          },
        };
      }

      const subscribers = await ctx.db.subscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          email: true,
          name: true,
          status: true,
          createdAt: true,
        },
      });

      // Generate CSV content
      const csvRows = [
        "email,name,status,subscribed_date", // Header
        ...subscribers.map(
          (sub) =>
            `${sub.email},"${sub.name ?? ""}",${sub.status},${sub.createdAt.toISOString()}`,
        ),
      ];

      return {
        csv: csvRows.join("\n"),
        count: subscribers.length,
      };
    }),

  // Public unsubscribe endpoint
  unsubscribe: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const subscriber = await ctx.db.subscriber.findUnique({
        where: { unsubscribeToken: input.token },
      });

      if (!subscriber) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscriber not found",
        });
      }

      // Update status to unsubscribed
      await ctx.db.subscriber.update({
        where: { id: subscriber.id },
        data: { status: "UNSUBSCRIBED" },
      });

      return { success: true };
    }),

  // Public subscribe endpoint
  subscribe: publicProcedure
    .input(
      z.object({
        clubId: z.string(),
        email: z.string().email(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify club exists and is active
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
        select: { isActive: true },
      });

      if (!club?.isActive) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      // Check if subscriber already exists
      const existing = await ctx.db.subscriber.findUnique({
        where: {
          clubId_email: {
            clubId: input.clubId,
            email: input.email,
          },
        },
      });

      if (existing) {
        // If already subscribed, just return success
        if (existing.status === "SUBSCRIBED") {
          return { success: true, alreadySubscribed: true };
        }

        // If unsubscribed or bounced, reactivate
        await ctx.db.subscriber.update({
          where: { id: existing.id },
          data: {
            status: "SUBSCRIBED",
            name: input.name ?? existing.name,
          },
        });

        return { success: true, resubscribed: true };
      }

      // Get the default email list
      const defaultList = await ctx.db.emailList.findFirst({
        where: {
          clubId: input.clubId,
          isDefault: true,
        },
      });

      if (!defaultList) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Default email list not found",
        });
      }

      // Create new subscriber and add to default list
      await ctx.db.$transaction(async (tx) => {
        const newSubscriber = await tx.subscriber.create({
          data: {
            clubId: input.clubId,
            email: input.email,
            name: input.name,
            status: "SUBSCRIBED",
          },
        });

        await tx.subscriberListMembership.create({
          data: {
            subscriberId: newSubscriber.id,
            emailListId: defaultList.id,
          },
        });
      });

      return { success: true, alreadySubscribed: false };
    }),
});
