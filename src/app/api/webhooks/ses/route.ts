import { db } from "@/server/db";
import { processSESNotification } from "@/server/services/bounce-complaint";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * SNS Webhook Endpoint for SES Notifications
 *
 * This endpoint receives notifications from AWS SNS for bounces, complaints, and deliveries.
 * AWS SNS will send POST requests to this endpoint with notification messages.
 *
 * Setup instructions:
 * 1. Create an SNS topic in AWS
 * 2. Subscribe SES to send bounce/complaint notifications to this topic
 * 3. Subscribe this endpoint to the SNS topic (HTTPS subscription)
 * 4. AWS will send a SubscriptionConfirmation message first - visit the URL to confirm
 */

interface SNSMessage {
  Type: string;
  MessageId: string;
  TopicArn?: string;
  Message?: string;
  Timestamp?: string;
  SignatureVersion?: string;
  Signature?: string;
  SigningCertURL?: string;
  SubscribeURL?: string;
  Token?: string;
  Subject?: string;
}

/**
 * Verify SNS message signature
 * This ensures the message actually came from AWS SNS
 */
async function verifySignature(message: SNSMessage): Promise<boolean> {
  // In production, you should verify the signature
  // For now, we'll skip this but you should implement it
  // See: https://docs.aws.amazon.com/sns/latest/dg/sns-verify-signature-of-message.html

  // Basic validation - check that it looks like an SNS message
  if (!message.Type || !message.MessageId) {
    return false;
  }

  // Verify the SigningCertURL is from AWS
  if (message.SigningCertURL) {
    try {
      const url = new URL(message.SigningCertURL);
      if (!url.hostname.endsWith(".amazonaws.com")) {
        return false;
      }
    } catch {
      return false;
    }
  }

  // TODO: Implement full signature verification in production
  // This would involve:
  // 1. Download the certificate from SigningCertURL
  // 2. Build the string to sign based on message type
  // 3. Verify the signature using the certificate

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SNSMessage;

    // Verify this is actually from SNS
    const isValid = await verifySignature(body);
    if (!isValid) {
      console.error("Invalid SNS message signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // Handle different SNS message types
    switch (body.Type) {
      case "SubscriptionConfirmation": {
        // When you first set up the SNS subscription, AWS will send this
        // You need to visit the SubscribeURL to confirm
        console.log("SNS Subscription Confirmation");
        console.log("Visit this URL to confirm:", body.SubscribeURL);

        // Auto-confirm by fetching the URL (optional)
        if (body.SubscribeURL) {
          try {
            await fetch(body.SubscribeURL);
            console.log("Subscription confirmed automatically");
          } catch (error) {
            console.error("Failed to auto-confirm subscription:", error);
          }
        }

        return NextResponse.json({
          message: "Subscription confirmation received",
        });
      }

      case "Notification": {
        if (!body.Message) {
          return NextResponse.json(
            { error: "No message in notification" },
            { status: 400 },
          );
        }

        // Parse the SES message from the SNS notification
        const sesMessage = JSON.parse(body.Message) as Record<string, unknown>;

        // Log the webhook for debugging and audit
        const webhookLog = await db.sNSWebhookLog.create({
          data: {
            messageType:
              (sesMessage.notificationType as string | undefined) ?? "Unknown",
            messageId: body.MessageId,
            payload: body.Message,
            processed: false,
          },
        });

        // Process the notification
        // Note: We trust the SNS message structure matches SESMessage interface
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        const result = await processSESNotification(sesMessage as any);

        // Update webhook log
        await db.sNSWebhookLog.update({
          where: { id: webhookLog.id },
          data: {
            processed: result.success,
            error: result.error,
          },
        });

        if (!result.success) {
          console.error("Failed to process SES notification:", result.error);
          return NextResponse.json({ error: result.error }, { status: 500 });
        }

        console.log(
          `Processed ${(sesMessage.notificationType as string | undefined) ?? "Unknown"} notification:`,
          body.MessageId,
        );

        return NextResponse.json({ success: true });
      }

      case "UnsubscribeConfirmation": {
        console.log("SNS Unsubscribe Confirmation");
        return NextResponse.json({
          message: "Unsubscribe confirmation received",
        });
      }

      default:
        console.warn("Unknown SNS message type:", body.Type);
        return NextResponse.json(
          { error: "Unknown message type" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Error processing SNS webhook:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Allow GET for health checks
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "SES SNS Webhook",
    timestamp: new Date().toISOString(),
  });
}
