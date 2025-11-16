import { db } from "@/server/db";
import type { BounceType, SubscriberStatus } from "generated/prisma";

/**
 * Bounce and Complaint Processing Service
 *
 * This service handles processing bounce and complaint events from SES,
 * updating subscriber statuses based on configurable thresholds.
 */

interface BounceData {
  bounceType: "Transient" | "Permanent" | "Undetermined";
  bounceSubType?: string;
  bouncedRecipients: Array<{
    emailAddress: string;
    action?: string;
    status?: string;
    diagnosticCode?: string;
  }>;
  timestamp: string;
  feedbackId: string;
  remoteMtaIp?: string;
  reportingMTA?: string;
}

interface ComplaintData {
  complainedRecipients: Array<{
    emailAddress: string;
  }>;
  timestamp: string;
  feedbackId: string;
  userAgent?: string;
  complaintFeedbackType?: string;
  arrivalDate?: string;
}

interface SESMessage {
  notificationType: "Bounce" | "Complaint" | "Delivery";
  mail: {
    timestamp: string;
    source: string;
    sourceArn: string;
    sourceIp: string;
    sendingAccountId: string;
    messageId: string;
    destination: string[];
    headersTruncated?: boolean;
    headers?: Array<{
      name: string;
      value: string;
    }>;
    commonHeaders?: {
      from?: string[];
      to?: string[];
      messageId?: string;
      subject?: string;
    };
  };
  bounce?: BounceData;
  complaint?: ComplaintData;
}

/**
 * Get platform settings with defaults
 */
async function getPlatformSettings() {
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
}

/**
 * Process a bounce event from SES
 */
export async function processBounce(
  message: SESMessage,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!message.bounce) {
      return { success: false, error: "No bounce data in message" };
    }

    const bounce = message.bounce;
    const bounceType: BounceType =
      bounce.bounceType === "Permanent" ? "HARD" : "SOFT";

    // Get platform settings
    const settings = await getPlatformSettings();

    // Find the email record by provider message ID
    const email = await db.email.findFirst({
      where: { providerMessageId: message.mail.messageId },
      include: { subscriber: true },
    });

    for (const recipient of bounce.bouncedRecipients) {
      const emailAddress = recipient.emailAddress.toLowerCase();

      // Find subscriber by email
      let subscriber = email?.subscriber;
      if (!subscriber) {
        const foundSubscriber = await db.subscriber.findFirst({
          where: { email: emailAddress },
        });
        subscriber = foundSubscriber ?? undefined;
      }

      if (!subscriber) {
        console.warn(`Subscriber not found for bounced email: ${emailAddress}`);
        continue;
      }

      // Create bounce event record
      await db.bounceEvent.create({
        data: {
          bounceType,
          bounceSubType: bounce.bounceSubType,
          diagnosticCode: recipient.diagnosticCode,
          providerMessageId: message.mail.messageId,
          feedbackId: bounce.feedbackId,
          reportingMTA: bounce.reportingMTA,
          action: recipient.action,
          status: recipient.status,
          subscriberId: subscriber.id,
          emailId: email?.id,
        },
      });

      // Update email status
      if (email) {
        await db.email.update({
          where: { id: email.id },
          data: { status: "BOUNCED" },
        });
      }

      // Handle bounce based on type and thresholds
      if (bounceType === "HARD") {
        // Hard bounce - block immediately or unsubscribe based on settings
        const newStatus =
          settings.hardBounceAction === "BLOCK" ? "BLOCKED" : "BOUNCED";

        await db.subscriber.update({
          where: { id: subscriber.id },
          data: {
            status: newStatus as SubscriberStatus,
            updatedAt: new Date(),
          },
        });

        console.log(`Hard bounce: ${emailAddress} set to ${newStatus}`);
      } else {
        // Soft bounce - check threshold
        const bounceCount = await db.bounceEvent.count({
          where: {
            subscriberId: subscriber.id,
            bounceType: "SOFT",
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        });

        if (bounceCount >= settings.softBounceThreshold) {
          await db.subscriber.update({
            where: { id: subscriber.id },
            data: {
              status: "BOUNCED",
              updatedAt: new Date(),
            },
          });

          console.log(
            `Soft bounce threshold reached: ${emailAddress} unsubscribed (${bounceCount} bounces)`,
          );
        } else {
          console.log(
            `Soft bounce recorded for ${emailAddress} (${bounceCount}/${settings.softBounceThreshold})`,
          );
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error processing bounce:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Process a complaint event from SES
 */
export async function processComplaint(
  message: SESMessage,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!message.complaint) {
      return { success: false, error: "No complaint data in message" };
    }

    const complaint = message.complaint;

    // Get platform settings
    const settings = await getPlatformSettings();

    // Find the email record by provider message ID
    const email = await db.email.findFirst({
      where: { providerMessageId: message.mail.messageId },
      include: { subscriber: true },
    });

    for (const recipient of complaint.complainedRecipients) {
      const emailAddress = recipient.emailAddress.toLowerCase();

      // Find subscriber by email
      let subscriber = email?.subscriber;
      if (!subscriber) {
        const foundSubscriber = await db.subscriber.findFirst({
          where: { email: emailAddress },
        });
        subscriber = foundSubscriber ?? undefined;
      }

      if (!subscriber) {
        console.warn(`Subscriber not found for complaint: ${emailAddress}`);
        continue;
      }

      // Create complaint event record
      await db.complaintEvent.create({
        data: {
          complaintFeedbackType: complaint.complaintFeedbackType,
          userAgent: complaint.userAgent,
          providerMessageId: message.mail.messageId,
          feedbackId: complaint.feedbackId,
          arrivalDate: complaint.arrivalDate
            ? new Date(complaint.arrivalDate)
            : null,
          subscriberId: subscriber.id,
          emailId: email?.id,
        },
      });

      // Update email status
      if (email) {
        await db.email.update({
          where: { id: email.id },
          data: { status: "COMPLAINED" },
        });
      }

      // Check complaint threshold
      const complaintCount = await db.complaintEvent.count({
        where: {
          subscriberId: subscriber.id,
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      });

      if (complaintCount >= settings.complaintThreshold) {
        // Take action based on settings
        const newStatus =
          settings.complaintAction === "BLOCK" ? "BLOCKED" : "UNSUBSCRIBED";

        await db.subscriber.update({
          where: { id: subscriber.id },
          data: {
            status: newStatus as SubscriberStatus,
            updatedAt: new Date(),
          },
        });

        console.log(
          `Complaint threshold reached: ${emailAddress} set to ${newStatus} (${complaintCount} complaints)`,
        );
      } else {
        console.log(
          `Complaint recorded for ${emailAddress} (${complaintCount}/${settings.complaintThreshold})`,
        );
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error processing complaint:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Process an SES notification message
 */
export async function processSESNotification(message: SESMessage): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    switch (message.notificationType) {
      case "Bounce":
        return await processBounce(message);
      case "Complaint":
        return await processComplaint(message);
      case "Delivery":
        // Update email status to delivered if we have a record
        if (message.mail.messageId) {
          const email = await db.email.findFirst({
            where: { providerMessageId: message.mail.messageId },
          });

          if (email) {
            await db.email.update({
              where: { id: email.id },
              data: { status: "DELIVERED" },
            });
          }
        }
        return { success: true };
      default:
        return {
          success: false,
          error: `Unknown notification type: ${String(message.notificationType)}`,
        };
    }
  } catch (error) {
    console.error("Error processing SES notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
