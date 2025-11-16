import { env } from "@/env";
import { db } from "@/server/db";
import { sendCampaignEmail } from "@/server/services/email";
import type { QueueEmailJob } from "@/server/services/email-queue";
import { Receiver } from "@upstash/qstash";
import { type NextRequest, NextResponse } from "next/server";

/**
 * QStash Webhook: Send Campaign Email
 *
 * This endpoint is called by Upstash QStash to process queued email jobs.
 * It handles individual email sending with automatic retries.
 *
 * IMPORTANT: This route is protected by QStash signature verification.
 */

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

    const job = JSON.parse(verification.body) as QueueEmailJob;

    console.log(
      `Processing email job: ${job.emailId} for campaign ${job.campaignId}`,
    );

    // Verify email still exists and is in correct state
    const emailRecord = await db.email.findUnique({
      where: { id: job.emailId },
    });

    if (!emailRecord) {
      console.error(`Email record ${job.emailId} not found`);
      return NextResponse.json(
        { error: "Email record not found" },
        { status: 404 },
      );
    }

    // Skip if already sent
    if (emailRecord.status === "SENT" || emailRecord.status === "DELIVERED") {
      console.log(`Email ${job.emailId} already sent, skipping`);
      return NextResponse.json({ status: "already_sent" });
    }

    // Send the email
    const result = await sendCampaignEmail({
      subscriber: {
        email: job.subscriberEmail,
        name: job.subscriberName,
        unsubscribeToken: job.unsubscribeToken,
      },
      campaign: job.campaign,
      clubSettings: job.clubSettings,
      trackingToken: job.trackingToken,
    });

    // Update email record
    await db.email.update({
      where: { id: job.emailId },
      data: {
        providerMessageId: result.messageId,
        status: result.success ? "SENT" : "FAILED",
        errorMessage: result.error,
        sentAt: result.success ? new Date() : null,
      },
    });

    // Check if this was the last email for the campaign
    const remainingEmails = await db.email.count({
      where: {
        campaignId: job.campaignId,
        status: {
          in: ["QUEUED"],
        },
      },
    });

    // If no more queued emails, mark campaign as complete
    if (remainingEmails === 0) {
      const campaignStats = await db.email.groupBy({
        by: ["status"],
        where: { campaignId: job.campaignId },
        _count: true,
      });

      const sentCount =
        campaignStats.find((s) => s.status === "SENT")?._count ?? 0;
      const deliveredCount =
        campaignStats.find((s) => s.status === "DELIVERED")?._count ?? 0;
      const failedCount =
        campaignStats.find((s) => s.status === "FAILED")?._count ?? 0;

      const totalSent = sentCount + deliveredCount;

      await db.campaign.update({
        where: { id: job.campaignId },
        data: {
          status: totalSent > 0 ? "SENT" : "FAILED",
          finishedAt: new Date(),
        },
      });

      console.log(
        `Campaign ${job.campaignId} completed: ${totalSent} sent, ${failedCount} failed`,
      );
    }

    return NextResponse.json({
      success: result.success,
      emailId: job.emailId,
      messageId: result.messageId,
      error: result.error,
    });
  } catch (error) {
    console.error("Error processing email job:", error);

    // Update email record as failed if we have the job data
    try {
      const body = (await req.clone().json()) as QueueEmailJob;
      const job = body;

      await db.email.update({
        where: { id: job.emailId },
        data: {
          status: "FAILED",
          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
        },
      });
    } catch (updateError) {
      console.error("Failed to update email record:", updateError);
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
    endpoint: "QStash Email Queue Processor",
    timestamp: new Date().toISOString(),
  });
}
