import { db } from "@/server/db";
import { sendCampaignEmail } from "@/server/services/email";
import type { QueueEmailJob } from "@/server/services/email-queue";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * QStash Webhook: Send Campaign Email
 *
 * This endpoint is called by Upstash QStash to process queued email jobs.
 * It handles individual email sending with automatic retries.
 *
 * IMPORTANT: This route is protected by QStash signature verification.
 */

async function handler(req: NextRequest) {
  try {
    const job: QueueEmailJob = await req.json();

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
      const body = await req.clone().json();
      const job = body as QueueEmailJob;

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

// Export with QStash signature verification
// This ensures only QStash can call this endpoint
export const POST = verifySignatureAppRouter(handler);

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "QStash Email Queue Processor",
    timestamp: new Date().toISOString(),
  });
}
