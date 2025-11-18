import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  checkClubPermission,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  campaignStatusSchema,
  cuidSchema,
  emailSchema,
} from "@/server/api/validators";
import {
  batchSendCampaignEmails,
  sendTestEmail,
} from "@/server/services/email";
import {
  cancelScheduledCampaign,
  isQStashEnabled,
  queueCampaignEmails,
  scheduleCampaign,
} from "@/server/services/email-queue";

export const campaignsRouter = createTRPCRouter({
  // List campaigns for a club
  listCampaigns: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        status: campaignStatusSchema.optional(),
        limit: z.number().int().min(1).max(100).default(50),
        cursor: cuidSchema.optional(),
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
        status?:
          | "DRAFT"
          | "SCHEDULED"
          | "SENDING"
          | "SENT"
          | "FAILED"
          | "CANCELLED";
      } = {
        clubId: input.clubId,
      };

      if (input.status) {
        where.status = input.status;
      }

      const campaigns = await ctx.db.campaign.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
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

      let nextCursor: string | undefined = undefined;
      if (campaigns.length > input.limit) {
        const nextItem = campaigns.pop();
        nextCursor = nextItem?.id;
      }

      return {
        campaigns,
        nextCursor,
      };
    }),

  // Get a specific campaign
  getCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
        include: {
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

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      return campaign;
    }),

  // Get campaign statistics
  getCampaignStats: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      // Verify campaign belongs to club
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Get email delivery statistics
      const emails = await ctx.db.email.groupBy({
        by: ["status"],
        where: {
          campaignId: input.campaignId,
        },
        _count: true,
      });

      const stats = {
        total: 0,
        queued: 0,
        sent: 0,
        delivered: 0,
        bounced: 0,
        complained: 0,
        failed: 0,
      };

      emails.forEach((email) => {
        const count = email._count;
        stats.total += count;

        switch (email.status) {
          case "QUEUED":
            stats.queued = count;
            break;
          case "SENT":
            stats.sent = count;
            break;
          case "DELIVERED":
            stats.delivered = count;
            break;
          case "BOUNCED":
            stats.bounced = count;
            break;
          case "COMPLAINED":
            stats.complained = count;
            break;
          case "FAILED":
            stats.failed = count;
            break;
        }
      });

      return stats;
    }),

  // Get campaign engagement statistics (opens and clicks)
  getCampaignEngagement: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      // Verify campaign belongs to club
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Get all emails for this campaign
      const emails = await ctx.db.email.findMany({
        where: {
          campaignId: input.campaignId,
          status: "SENT", // Only count sent emails
        },
        select: {
          id: true,
          _count: {
            select: {
              opens: true,
              clicks: true,
            },
          },
        },
      });

      // Count unique emails with at least one open/click
      const uniqueOpens = emails.filter((e) => e._count.opens > 0).length;
      const uniqueClicks = emails.filter((e) => e._count.clicks > 0).length;

      // Count total opens/clicks (including duplicates)
      const totalOpens = emails.reduce((sum, e) => sum + e._count.opens, 0);
      const totalClicks = emails.reduce((sum, e) => sum + e._count.clicks, 0);

      // Get top clicked URLs
      const clickedUrls = await ctx.db.emailClick.groupBy({
        by: ["url"],
        where: {
          email: {
            campaignId: input.campaignId,
          },
        },
        _count: true,
        orderBy: {
          _count: {
            url: "desc",
          },
        },
        take: 10,
      });

      return {
        totalSent: emails.length,
        uniqueOpens,
        totalOpens,
        uniqueClicks,
        totalClicks,
        openRate: emails.length > 0 ? (uniqueOpens / emails.length) * 100 : 0,
        clickRate: emails.length > 0 ? (uniqueClicks / emails.length) * 100 : 0,
        topUrls: clickedUrls.map((u) => ({
          url: u.url,
          clicks: u._count,
        })),
      };
    }),

  // Create a new campaign
  createCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        name: z.string().min(1).max(255),
        subject: z.string().optional(),
        preheaderText: z.string().optional(),
        emailListId: cuidSchema,
        designJson: z.string().optional(),
        html: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Verify email list belongs to club
      const emailList = await ctx.db.emailList.findFirst({
        where: {
          id: input.emailListId,
          clubId: input.clubId,
        },
      });

      if (!emailList) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email list not found",
        });
      }

      // Get club settings for defaults
      const settings = await ctx.db.clubSettings.findUnique({
        where: { clubId: input.clubId },
      });

      if (!settings) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Club settings not found. Please configure your club settings first.",
        });
      }

      const fromEmailSlug =
        settings.fromEmailSlug && settings.fromEmailSlug.trim().length > 0
          ? settings.fromEmailSlug
          : ((
              await ctx.db.club.findUnique({
                where: { id: input.clubId },
                select: { slug: true },
              })
            )?.slug ?? "noreply");

      // Create campaign
      const campaign = await ctx.db.campaign.create({
        data: {
          clubId: input.clubId,
          emailListId: input.emailListId,
          name: input.name,
          subject: input.subject ?? "",
          preheaderText: input.preheaderText,
          fromName: settings.fromName,
          fromEmail: `${fromEmailSlug}@clubmail.csaonline.ca`,
          designJson: input.designJson ?? JSON.stringify({ blocks: [] }),
          html: input.html ?? "",
          status: "DRAFT",
          createdById: ctx.session.user.id,
        },
      });

      return campaign;
    }),

  // Update a campaign
  updateCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
        name: z.string().min(1).max(255).optional(),
        subject: z.string().optional(),
        preheaderText: z.string().optional().nullable(),
        fromName: z.string().optional(),
        designJson: z.string().optional(),
        html: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      const { clubId, campaignId, ...updateData } = input;

      // Verify campaign belongs to club and is editable
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: campaignId,
          clubId,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Only allow editing drafts and scheduled campaigns
      if (!["DRAFT", "SCHEDULED"].includes(campaign.status)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot edit a campaign that has been sent or is being sent",
        });
      }

      // If the client is not explicitly changing fromName/fromEmail, keep them
      // in sync with current club settings for drafts/scheduled campaigns.
      // This lets old campaigns pick up the new sender slug until they are sent.
      const needsSenderSync =
        typeof updateData.fromName === "undefined" &&
        typeof (updateData as { fromEmail?: string }).fromEmail === "undefined";

      if (needsSenderSync) {
        const settings = await ctx.db.clubSettings.findUnique({
          where: { clubId },
        });

        if (settings) {
          const fromEmailSlug =
            settings.fromEmailSlug && settings.fromEmailSlug.trim().length > 0
              ? settings.fromEmailSlug
              : ((
                  await ctx.db.club.findUnique({
                    where: { id: clubId },
                    select: { slug: true },
                  })
                )?.slug ?? "noreply");

          updateData.fromName = settings.fromName;
          (updateData as { fromEmail: string }).fromEmail =
            `${fromEmailSlug}@clubmail.csaonline.ca`;
        }
      }

      const updated = await ctx.db.campaign.update({
        where: { id: campaignId },
        data: updateData,
      });

      return updated;
    }),

  // Delete a campaign
  deleteCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Verify campaign belongs to club
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Only allow deleting drafts
      if (campaign.status !== "DRAFT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Can only delete draft campaigns",
        });
      }

      await ctx.db.campaign.delete({
        where: { id: input.campaignId },
      });

      return { success: true };
    }),

  // Send test email
  sendTest: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
        testEmail: emailSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Verify campaign belongs to club
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Validate campaign has content
      if (!campaign.subject || !campaign.html) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Campaign must have a subject and content before sending test",
        });
      }

      // Get club settings
      const settings = await ctx.db.clubSettings.findUnique({
        where: { clubId: input.clubId },
      });

      if (!settings) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club settings not found",
        });
      }

      // Send test email
      const result = await sendTestEmail({
        testEmail: input.testEmail,
        campaign: {
          subject: campaign.subject,
          fromName: campaign.fromName,
          fromEmail: campaign.fromEmail,
          html: campaign.html,
        },
        clubSettings: {
          replyToEmail: settings.replyToEmail,
        },
      });

      if (!result.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to send test email: ${result.error}`,
        });
      }

      return { success: true, message: "Test email sent successfully" };
    }),

  // Send campaign
  sendCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Verify campaign belongs to club
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
        include: {
          emailList: true,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Verify campaign is in DRAFT status
      if (campaign.status !== "DRAFT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Campaign has already been sent or is being sent",
        });
      }

      // Validate campaign has required fields
      if (!campaign.subject || !campaign.html) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Campaign must have a subject and content before sending",
        });
      }

      // Get club settings
      const settings = await ctx.db.clubSettings.findUnique({
        where: { clubId: input.clubId },
      });

      if (!settings) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club settings not found",
        });
      }

      // Get all SUBSCRIBED subscribers from the email list
      const subscribers = await ctx.db.subscriber.findMany({
        where: {
          clubId: input.clubId,
          status: "SUBSCRIBED",
          listMemberships: {
            some: {
              emailListId: campaign.emailListId,
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          unsubscribeToken: true,
        },
      });

      if (subscribers.length === 0) {
        // No subscribers to send to
        await ctx.db.campaign.update({
          where: { id: input.campaignId },
          data: {
            status: "SENT",
            finishedAt: new Date(),
          },
        });

        return {
          success: true,
          message: "Campaign completed (no subscribers to send to)",
          sent: 0,
          failed: 0,
        };
      }

      // ========================================
      // USE QSTASH QUEUE IF AVAILABLE
      // ========================================
      if (isQStashEnabled()) {
        const queueResult = await queueCampaignEmails(input.campaignId);

        if (!queueResult.success) {
          // Revert campaign status on failure
          await ctx.db.campaign.update({
            where: { id: input.campaignId },
            data: {
              status: "DRAFT",
              startedAt: null,
            },
          });

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: queueResult.message,
          });
        }

        return {
          success: true,
          message: queueResult.message,
          sent: queueResult.queued,
          failed: queueResult.failed,
          queued: true, // Indicate this was queued
        };
      }

      // ========================================
      // FALLBACK: DIRECT SEND (LEGACY/SMALL CAMPAIGNS)
      // ========================================
      // Update campaign status to SENDING
      await ctx.db.campaign.update({
        where: { id: input.campaignId },
        data: {
          status: "SENDING",
          startedAt: new Date(),
        },
      });

      try {
        // Create Email records BEFORE sending so we have tracking tokens
        const emailRecords = await Promise.all(
          subscribers.map((subscriber) =>
            ctx.db.email.create({
              data: {
                campaignId: input.campaignId,
                subscriberId: subscriber.id,
                status: "QUEUED",
              },
              select: {
                id: true,
                trackingToken: true,
                subscriberId: true,
              },
            }),
          ),
        );

        // Create a map of subscriberId to trackingToken for easy lookup
        const trackingTokenMap = new Map(
          emailRecords.map((record) => [
            record.subscriberId,
            record.trackingToken,
          ]),
        );

        // Send emails in batch with rate limiting
        const { sent, failed, rateLimited, results } =
          await batchSendCampaignEmails({
            subscribers: subscribers.map((sub) => ({
              ...sub,
              trackingToken: settings.enableTracking
                ? trackingTokenMap.get(sub.id)!
                : undefined,
            })),
            campaign: {
              subject: campaign.subject,
              fromName: campaign.fromName,
              fromEmail: campaign.fromEmail,
              html: campaign.html,
            },
            clubSettings: {
              replyToEmail: settings.replyToEmail,
            },
            maxPerSecond: 10, // Conservative rate limit
          });

        // Update Email records with send results
        await Promise.all(
          results.map((result) => {
            const emailRecord = emailRecords.find(
              (r) => r.subscriberId === result.subscriberId,
            );
            if (!emailRecord) return Promise.resolve();

            return ctx.db.email.update({
              where: { id: emailRecord.id },
              data: {
                providerMessageId: result.messageId,
                status: result.success ? "SENT" : "FAILED",
                errorMessage: result.error,
                sentAt: result.success ? new Date() : null,
              },
            });
          }),
        );

        // Update campaign status
        await ctx.db.campaign.update({
          where: { id: input.campaignId },
          data: {
            status: rateLimited
              ? "SENDING" // Keep as SENDING if rate limited (can be resumed)
              : failed > 0 && sent === 0
                ? "FAILED"
                : "SENT",
            finishedAt: rateLimited ? null : new Date(),
          },
        });

        if (rateLimited) {
          return {
            success: false,
            message: `Rate limit exceeded: ${sent} sent, ${failed} failed. Campaign paused. Please try again later or contact admin to adjust rate limits.`,
            sent,
            failed,
          };
        }

        return {
          success: true,
          message: `Campaign sent: ${sent} successful, ${failed} failed`,
          sent,
          failed,
        };
      } catch (error) {
        // Mark campaign as failed
        await ctx.db.campaign.update({
          where: { id: input.campaignId },
          data: {
            status: "FAILED",
            finishedAt: new Date(),
          },
        });

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to send campaign: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Duplicate a campaign
  duplicateCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Get the original campaign
      const originalCampaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
      });

      if (!originalCampaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Create a duplicate with DRAFT status
      const duplicatedCampaign = await ctx.db.campaign.create({
        data: {
          name: `${originalCampaign.name} (Copy)`,
          subject: originalCampaign.subject,
          preheaderText: originalCampaign.preheaderText,
          designJson: originalCampaign.designJson,
          html: originalCampaign.html,
          fromName: originalCampaign.fromName,
          fromEmail: originalCampaign.fromEmail,
          clubId: originalCampaign.clubId,
          emailListId: originalCampaign.emailListId,
          createdById: ctx.session.user.id,
          status: "DRAFT",
        },
      });

      return duplicatedCampaign;
    }),

  // Schedule a campaign for future delivery
  scheduleCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
        scheduledFor: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Verify campaign belongs to club
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Verify campaign is in DRAFT status
      if (campaign.status !== "DRAFT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Only draft campaigns can be scheduled. This campaign has already been sent or scheduled.",
        });
      }

      // Validate campaign has required fields
      if (!campaign.subject || !campaign.html) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Campaign must have a subject and content before scheduling",
        });
      }

      // Ensure scheduled time is in the future
      if (input.scheduledFor <= new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Scheduled time must be in the future",
        });
      }

      // Schedule using QStash
      const result = await scheduleCampaign(
        input.campaignId,
        input.scheduledFor,
      );

      if (!result.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to schedule campaign: ${result.message}`,
        });
      }

      return {
        success: true,
        message: result.message,
        scheduledFor: input.scheduledFor,
        messageId: result.messageId,
      };
    }),

  // Cancel a scheduled campaign
  cancelCampaign: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        campaignId: cuidSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Verify campaign belongs to club
      const campaign = await ctx.db.campaign.findFirst({
        where: {
          id: input.campaignId,
          clubId: input.clubId,
        },
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      // Only allow cancelling scheduled campaigns
      if (campaign.status !== "SCHEDULED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only scheduled campaigns can be cancelled",
        });
      }

      // Note: cancelScheduledCampaign will reset the campaign to DRAFT status

      const result = await cancelScheduledCampaign(input.campaignId);

      if (!result.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to cancel campaign: ${result.message}`,
        });
      }

      return {
        success: true,
        message: result.message,
      };
    }),

  // Get scheduled campaigns for a club (for calendar view)
  getScheduledCampaigns: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        startDate: z.date().optional(),
        endDate: z.date().optional(),
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
        status: "SCHEDULED";
        scheduledFor?: {
          gte?: Date;
          lte?: Date;
        };
      } = {
        clubId: input.clubId,
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
