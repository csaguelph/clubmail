import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    clubEditorProcedure,
    clubViewerProcedure,
    createTRPCRouter,
} from "@/server/api/trpc";
import {
    batchSendCampaignEmails,
    sendTestEmail,
} from "@/server/services/email";

export const campaignsRouter = createTRPCRouter({
  // List campaigns for a club
  listCampaigns: clubViewerProcedure
    .input(
      z.object({
        clubId: z.string(),
        status: z
          .enum(["DRAFT", "SCHEDULED", "SENDING", "SENT", "FAILED", "CANCELLED"])
          .optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: {
        clubId: string;
        status?: "DRAFT" | "SCHEDULED" | "SENDING" | "SENT" | "FAILED" | "CANCELLED";
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
              emailEvents: true,
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
  getCampaign: clubViewerProcedure
    .input(
      z.object({
        clubId: z.string(),
        campaignId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
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
              emailEvents: true,
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
  getCampaignStats: clubViewerProcedure
    .input(
      z.object({
        clubId: z.string(),
        campaignId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
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

      // Get event statistics
      const events = await ctx.db.emailEvent.groupBy({
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

      events.forEach((event) => {
        const count = event._count;
        stats.total += count;

        switch (event.status) {
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

  // Create a new campaign
  createCampaign: clubEditorProcedure
    .input(
      z.object({
        clubId: z.string(),
        name: z.string().min(1).max(255),
        subject: z.string().optional(),
        preheaderText: z.string().optional(),
        emailListId: z.string(),
        designJson: z.string().optional(),
        html: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
          message: "Club settings not found. Please configure your club settings first.",
        });
      }

      // Create campaign
      const campaign = await ctx.db.campaign.create({
        data: {
          clubId: input.clubId,
          emailListId: input.emailListId,
          name: input.name,
          subject: input.subject || "",
          preheaderText: input.preheaderText,
          fromName: settings.fromName,
          fromEmail: settings.fromEmail,
          designJson: input.designJson || JSON.stringify({ blocks: [] }),
          html: input.html || "",
          status: "DRAFT",
          createdById: ctx.session.user.id,
        },
      });

      return campaign;
    }),

  // Update a campaign
  updateCampaign: clubEditorProcedure
    .input(
      z.object({
        clubId: z.string(),
        campaignId: z.string(),
        name: z.string().min(1).max(255).optional(),
        subject: z.string().optional(),
        preheaderText: z.string().optional().nullable(),
        fromName: z.string().optional(),
        fromEmail: z.string().email().optional(),
        designJson: z.string().optional(),
        html: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

      const updated = await ctx.db.campaign.update({
        where: { id: campaignId },
        data: updateData,
      });

      return updated;
    }),

  // Delete a campaign
  deleteCampaign: clubEditorProcedure
    .input(
      z.object({
        clubId: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
  sendTest: clubEditorProcedure
    .input(
      z.object({
        clubId: z.string(),
        campaignId: z.string(),
        testEmail: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
          message: "Campaign must have a subject and content before sending test",
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
  sendCampaign: clubEditorProcedure
    .input(
      z.object({
        clubId: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

      // Update campaign status to SENDING
      await ctx.db.campaign.update({
        where: { id: input.campaignId },
        data: {
          status: "SENDING",
          startedAt: new Date(),
        },
      });

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

      try {
        // Send emails in batch with rate limiting
        const { sent, failed, results } = await batchSendCampaignEmails({
          subscribers,
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

        // Create EmailEvent records for tracking
        await ctx.db.emailEvent.createMany({
          data: results.map((result) => ({
            campaignId: input.campaignId,
            subscriberId: result.subscriberId,
            providerMessageId: result.messageId,
            status: result.success ? "SENT" : "FAILED",
            errorMessage: result.error,
            timestamp: new Date(),
          })),
        });

        // Update campaign status
        await ctx.db.campaign.update({
          where: { id: input.campaignId },
          data: {
            status: failed > 0 && sent === 0 ? "FAILED" : "SENT",
            finishedAt: new Date(),
          },
        });

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
});
