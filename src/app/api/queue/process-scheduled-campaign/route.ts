import { env } from "@/env";
import { db } from "@/server/db";
import { queueCampaignEmails } from "@/server/services/email-queue";
import { Receiver } from "@upstash/qstash";
import { type NextRequest, NextResponse } from "next/server";

/**
 * QStash Webhook: Process Scheduled Campaign
 *
 * This endpoint is called by Upstash QStash when a scheduled campaign's time arrives.
 * It triggers the actual email sending process by queueing all campaign emails.
 *
 * IMPORTANT: This route is protected by QStash signature verification.
 */

interface ScheduledCampaignJob {
  campaignId: string;
  scheduledFor: string; // ISO date string
}

/**
 * Verify QStash signature and return parsed body
 */
async function verifyQStashSignature(
  req: NextRequest,
): Promise<{ valid: boolean; body?: string }> {
  // Skip verification if QStash is not configured (e.g., in CI builds)
  if (!env.QSTASH_CURRENT_SIGNING_KEY || !env.QSTASH_NEXT_SIGNING_KEY) {
    console.warn("QStash signing keys not configured - skipping verification");
    return { valid: false };
  }

  try {
    const receiver = new Receiver({
      currentSigningKey: env.QSTASH_CURRENT_SIGNING_KEY,
      nextSigningKey: env.QSTASH_NEXT_SIGNING_KEY,
    });

    const signature = req.headers.get("upstash-signature");
    if (!signature) {
      return { valid: false };
    }

    const body = await req.text();
    await receiver.verify({
      signature,
      body,
    });

    return { valid: true, body };
  } catch (error) {
    console.error("QStash signature verification failed:", error);
    return { valid: false };
  }
}

async function handler(req: NextRequest) {
  try {
    // Verify QStash signature and get body
    const verification = await verifyQStashSignature(req);
    if (!verification.valid || !verification.body) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid signature" },
        { status: 401 },
      );
    }

    const job = JSON.parse(verification.body) as ScheduledCampaignJob;

    console.log(
      `Processing scheduled campaign: ${job.campaignId} (scheduled for ${job.scheduledFor})`,
    );

    // Verify campaign exists and is in SCHEDULED state
    const campaign = await db.campaign.findUnique({
      where: { id: job.campaignId },
      select: {
        id: true,
        status: true,
        scheduledFor: true,
        subject: true,
        html: true,
      },
    });

    if (!campaign) {
      console.error(`Campaign ${job.campaignId} not found`);
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 },
      );
    }

    // Check if campaign is still scheduled
    if (campaign.status === "CANCELLED") {
      console.log(`Campaign ${job.campaignId} was cancelled, skipping`);
      return NextResponse.json({
        status: "cancelled",
        message: "Campaign was cancelled",
      });
    }

    if (campaign.status !== "SCHEDULED") {
      console.log(
        `Campaign ${job.campaignId} is in ${campaign.status} state, skipping`,
      );
      return NextResponse.json({
        status: "already_processed",
        message: `Campaign is in ${campaign.status} state`,
      });
    }

    // Verify it's time to send (with 5-minute buffer for clock drift)
    const now = new Date();
    const scheduledTime = new Date(job.scheduledFor);
    const bufferMs = 5 * 60 * 1000; // 5 minutes

    if (scheduledTime.getTime() > now.getTime() + bufferMs) {
      console.warn(
        `Campaign ${job.campaignId} scheduled for ${scheduledTime.toISOString()} but current time is ${now.toISOString()}`,
      );
      // Don't fail - QStash may have scheduled it slightly early
    }

    // Queue all campaign emails for sending
    console.log(`Queueing emails for campaign ${job.campaignId}`);
    const queueResult = await queueCampaignEmails(job.campaignId);

    if (!queueResult.success) {
      console.error(
        `Failed to queue campaign ${job.campaignId}: ${queueResult.message}`,
      );

      // Mark campaign as failed
      await db.campaign.update({
        where: { id: job.campaignId },
        data: {
          status: "FAILED",
          finishedAt: new Date(),
        },
      });

      return NextResponse.json(
        {
          error: queueResult.message,
          queued: queueResult.queued,
          failed: queueResult.failed,
        },
        { status: 500 },
      );
    }

    console.log(
      `Successfully queued ${queueResult.queued} emails for campaign ${job.campaignId}`,
    );

    return NextResponse.json({
      success: true,
      campaignId: job.campaignId,
      queued: queueResult.queued,
      failed: queueResult.failed,
      message: queueResult.message,
    });
  } catch (error) {
    console.error("Error processing scheduled campaign:", error);

    // Try to mark campaign as failed if we have the job data
    try {
      const body = (await req.clone().json()) as ScheduledCampaignJob;
      const job = body;

      await db.campaign.update({
        where: { id: job.campaignId },
        data: {
          status: "FAILED",
          finishedAt: new Date(),
        },
      });
    } catch (updateError) {
      console.error("Failed to update campaign status:", updateError);
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Export POST handler with signature verification built-in
export const POST = handler;

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "QStash Scheduled Campaign Processor",
    timestamp: new Date().toISOString(),
  });
}
