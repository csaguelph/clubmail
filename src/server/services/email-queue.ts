import { env } from "@/env";
import { db } from "@/server/db";
import { Client } from "@upstash/qstash";
import { calculateSendDelay, checkRateLimit } from "./rate-limit";

/**
 * Email Queue Service using Upstash QStash
 *
 * This service queues campaign emails for asynchronous processing,
 * respecting rate limits and ensuring reliable delivery even for large campaigns.
 */

let qstashClient: Client | null = null;

/**
 * Get or create QStash client
 */
function getQStashClient(): Client {
  if (!env.QSTASH_TOKEN) {
    throw new Error(
      "QStash is not configured. Set QSTASH_TOKEN environment variable.",
    );
  }

  qstashClient ??= new Client({
    token: env.QSTASH_TOKEN,
  });

  return qstashClient;
}

/**
 * Check if QStash is configured and available
 */
export function isQStashEnabled(): boolean {
  return !!(env.QSTASH_TOKEN && env.QSTASH_URL);
}

export interface QueueEmailJob {
  emailId: string;
  campaignId: string;
  subscriberId: string;
  subscriberEmail: string;
  subscriberName?: string | null;
  unsubscribeToken: string;
  trackingToken?: string;
  campaign: {
    subject: string;
    fromName: string;
    fromEmail: string;
    html: string;
  };
  clubSettings: {
    replyToEmail?: string | null;
  };
}

/**
 * Queue a single email for sending
 *
 * @param job - Email job details
 * @param delaySeconds - Delay before processing (for rate limiting)
 */
export async function queueEmail(
  job: QueueEmailJob,
  delaySeconds = 0,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const client = getQStashClient();
    const callbackUrl = `${env.NEXT_PUBLIC_BASE_URL}/api/queue/send-campaign-email`;

    const response = await client.publishJSON({
      url: callbackUrl,
      body: job,
      // Add delay for rate limiting
      ...(delaySeconds > 0 && { delay: delaySeconds }),
      // Retry configuration
      retries: 3,
      // Add headers for easier debugging
      headers: {
        "X-Campaign-Id": job.campaignId,
        "X-Email-Id": job.emailId,
      },
    });

    return {
      success: true,
      messageId: response.messageId,
    };
  } catch (error) {
    console.error("Failed to queue email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Queue all emails for a campaign with rate limiting
 *
 * This intelligently spaces out email jobs to respect rate limits.
 *
 * @param campaignId - Campaign ID
 * @returns Status of queue operation
 */
export async function queueCampaignEmails(campaignId: string): Promise<{
  success: boolean;
  queued: number;
  failed: number;
  message: string;
  rateLimited?: boolean;
}> {
  // Get campaign with all necessary data
  const campaign = await db.campaign.findUnique({
    where: { id: campaignId },
    include: {
      club: {
        include: {
          settings: true,
        },
      },
      emailList: {
        include: {
          memberships: {
            include: {
              subscriber: true,
            },
            where: {
              subscriber: {
                status: "SUBSCRIBED",
              },
            },
          },
        },
      },
    },
  });

  if (!campaign) {
    return {
      success: false,
      queued: 0,
      failed: 0,
      message: "Campaign not found",
    };
  }

  const subscribers = campaign.emailList.memberships.map((m) => m.subscriber);

  if (subscribers.length === 0) {
    return {
      success: true,
      queued: 0,
      failed: 0,
      message: "No subscribers to send to",
    };
  }

  // Check if we can queue this many emails
  const rateLimitCheck = await checkRateLimit(subscribers.length);
  if (!rateLimitCheck.allowed) {
    return {
      success: false,
      queued: 0,
      failed: subscribers.length,
      message: `${rateLimitCheck.reason}. Current: ${rateLimitCheck.currentCount}/${rateLimitCheck.limit}. Reset at: ${rateLimitCheck.resetTime?.toISOString()}`,
      rateLimited: true,
    };
  }

  // Calculate delay between emails to respect rate limits (per-second and per-day)
  const delayMs = await calculateSendDelay(subscribers.length);

  // Create Email records first (for tracking)
  const emailRecords = await Promise.all(
    subscribers.map((subscriber) =>
      db.email.create({
        data: {
          campaignId: campaign.id,
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

  const trackingTokenMap = new Map(
    emailRecords.map((record) => [record.subscriberId, record]),
  );

  let queued = 0;
  let failed = 0;

  // Queue each email with incremental delay for rate limiting
  for (let i = 0; i < subscribers.length; i++) {
    const subscriber = subscribers[i]!;
    const emailRecord = trackingTokenMap.get(subscriber.id)!;

    // Calculate delay for this specific email (spread them out)
    const delaySeconds = Math.floor((delayMs * i) / 1000);

    const job: QueueEmailJob = {
      emailId: emailRecord.id,
      campaignId: campaign.id,
      subscriberId: subscriber.id,
      subscriberEmail: subscriber.email,
      subscriberName: subscriber.name,
      unsubscribeToken: subscriber.unsubscribeToken,
      trackingToken: campaign.club.settings?.enableTracking
        ? emailRecord.trackingToken
        : undefined,
      campaign: {
        subject: campaign.subject,
        fromName: campaign.fromName,
        fromEmail: campaign.fromEmail,
        html: campaign.html,
      },
      clubSettings: {
        replyToEmail: campaign.club.settings?.replyToEmail,
      },
    };

    const result = await queueEmail(job, delaySeconds);

    if (result.success) {
      queued++;
    } else {
      failed++;
      // Mark email as failed
      await db.email.update({
        where: { id: emailRecord.id },
        data: {
          status: "FAILED",
          errorMessage: `Failed to queue: ${result.error}`,
        },
      });
    }
  }

  // Update campaign status
  await db.campaign.update({
    where: { id: campaignId },
    data: {
      status: "SENDING",
      startedAt: new Date(),
    },
  });

  return {
    success: failed === 0,
    queued,
    failed,
    message:
      failed === 0
        ? `Successfully queued ${queued} emails for background delivery`
        : `Queued ${queued} emails, ${failed} failed to queue`,
  };
}

/**
 * Get queue statistics for monitoring
 */
export async function getQueueStats() {
  const [queued, sending] = await Promise.all([
    db.email.count({
      where: { status: "QUEUED" },
    }),
    db.campaign.count({
      where: { status: "SENDING" },
    }),
  ]);

  return {
    queuedEmails: queued,
    activeCampaigns: sending,
    qstashEnabled: isQStashEnabled(),
  };
}
