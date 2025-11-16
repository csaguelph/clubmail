import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

/**
 * Platform Settings Router
 *
 * Manages global platform configuration for bounce/complaint handling
 */

export const platformSettingsRouter = createTRPCRouter({
  /**
   * Get current platform settings
   */
  get: adminProcedure.query(async () => {
    let settings = await db.platformSettings.findUnique({
      where: { id: "platform_settings" },
    });

    settings ??= await db.platformSettings.create({
      data: {
        id: "platform_settings",
        softBounceThreshold: 2,
        hardBounceAction: "BLOCK",
        complaintThreshold: 1,
        complaintAction: "UNSUBSCRIBE",
        enableAutoCleanup: true,
      },
    });

    return settings;
  }),

  /**
   * Update platform settings
   */
  update: adminProcedure
    .input(
      z.object({
        softBounceThreshold: z.number().int().min(1).max(10).optional(),
        hardBounceAction: z.enum(["BLOCK", "UNSUBSCRIBE"]).optional(),
        complaintThreshold: z.number().int().min(1).max(10).optional(),
        complaintAction: z.enum(["BLOCK", "UNSUBSCRIBE"]).optional(),
        enableAutoCleanup: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      // Ensure settings exist
      let settings = await db.platformSettings.findUnique({
        where: { id: "platform_settings" },
      });

      if (!settings) {
        // Create with defaults if they don't exist
        settings = await db.platformSettings.create({
          data: {
            id: "platform_settings",
            softBounceThreshold: input.softBounceThreshold ?? 2,
            hardBounceAction: input.hardBounceAction ?? "BLOCK",
            complaintThreshold: input.complaintThreshold ?? 1,
            complaintAction: input.complaintAction ?? "UNSUBSCRIBE",
            enableAutoCleanup: input.enableAutoCleanup ?? true,
          },
        });
      } else {
        // Update existing settings
        settings = await db.platformSettings.update({
          where: { id: "platform_settings" },
          data: input,
        });
      }

      return settings;
    }),

  /**
   * Get bounce/complaint statistics
   */
  getStats: adminProcedure.query(async () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalBounces,
      bouncesLast30Days,
      bouncesLast7Days,
      softBounces,
      hardBounces,
      totalComplaints,
      complaintsLast30Days,
      complaintsLast7Days,
      blockedSubscribers,
      bouncedSubscribers,
    ] = await Promise.all([
      db.bounceEvent.count(),
      db.bounceEvent.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      db.bounceEvent.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      db.bounceEvent.count({ where: { bounceType: "SOFT" } }),
      db.bounceEvent.count({ where: { bounceType: "HARD" } }),
      db.complaintEvent.count(),
      db.complaintEvent.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      db.complaintEvent.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      db.subscriber.count({ where: { status: "BLOCKED" } }),
      db.subscriber.count({ where: { status: "BOUNCED" } }),
    ]);

    return {
      bounces: {
        total: totalBounces,
        last30Days: bouncesLast30Days,
        last7Days: bouncesLast7Days,
        soft: softBounces,
        hard: hardBounces,
      },
      complaints: {
        total: totalComplaints,
        last30Days: complaintsLast30Days,
        last7Days: complaintsLast7Days,
      },
      subscribers: {
        blocked: blockedSubscribers,
        bounced: bouncedSubscribers,
      },
    };
  }),

  /**
   * Get recent bounce/complaint events
   */
  getRecentEvents: adminProcedure
    .input(
      z.object({
        type: z.enum(["bounce", "complaint"]).optional(),
        limit: z.number().int().min(1).max(100).default(50),
      }),
    )
    .query(async ({ input }) => {
      if (input.type === "bounce" || !input.type) {
        const bounces = await db.bounceEvent.findMany({
          take: input.limit,
          orderBy: { createdAt: "desc" },
          include: {
            subscriber: {
              select: {
                id: true,
                email: true,
                status: true,
              },
            },
            email: {
              select: {
                id: true,
                campaign: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });

        if (input.type === "bounce") {
          return { bounces };
        }
      }

      if (input.type === "complaint" || !input.type) {
        const complaints = await db.complaintEvent.findMany({
          take: input.limit,
          orderBy: { createdAt: "desc" },
          include: {
            subscriber: {
              select: {
                id: true,
                email: true,
                status: true,
              },
            },
            email: {
              select: {
                id: true,
                campaign: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });

        if (input.type === "complaint") {
          return { complaints };
        }
      }

      // If no type specified, return both
      const [bounces, complaints] = await Promise.all([
        db.bounceEvent.findMany({
          take: input.limit,
          orderBy: { createdAt: "desc" },
          include: {
            subscriber: {
              select: {
                id: true,
                email: true,
                status: true,
              },
            },
            email: {
              select: {
                id: true,
                campaign: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        }),
        db.complaintEvent.findMany({
          take: input.limit,
          orderBy: { createdAt: "desc" },
          include: {
            subscriber: {
              select: {
                id: true,
                email: true,
                status: true,
              },
            },
            email: {
              select: {
                id: true,
                campaign: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        }),
      ]);

      return { bounces, complaints };
    }),

  /**
   * Get subscriber bounce/complaint history
   */
  getSubscriberHistory: adminProcedure
    .input(
      z.object({
        subscriberId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const [subscriber, bounces, complaints] = await Promise.all([
        db.subscriber.findUnique({
          where: { id: input.subscriberId },
          include: {
            club: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        }),
        db.bounceEvent.findMany({
          where: { subscriberId: input.subscriberId },
          orderBy: { createdAt: "desc" },
          include: {
            email: {
              select: {
                campaign: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        }),
        db.complaintEvent.findMany({
          where: { subscriberId: input.subscriberId },
          orderBy: { createdAt: "desc" },
          include: {
            email: {
              select: {
                campaign: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        }),
      ]);

      if (!subscriber) {
        throw new Error("Subscriber not found");
      }

      return {
        subscriber,
        bounces,
        complaints,
      };
    }),
});
