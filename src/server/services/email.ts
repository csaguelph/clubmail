import { env } from "@/env";
import {
  SESClient,
  SendEmailCommand,
  SendRawEmailCommand,
} from "@aws-sdk/client-ses";
import { checkRateLimit } from "./rate-limit";

/**
 * AWS SES Email Service
 *
 * This service handles all email sending operations using AWS SES.
 * Includes rate limiting to comply with AWS SES quotas.
 */

// Initialize SES client
const getSESClient = () => {
  if (
    !env.AWS_SES_REGION ||
    !env.AWS_SES_ACCESS_KEY_ID ||
    !env.AWS_SES_SECRET_ACCESS_KEY
  ) {
    throw new Error("AWS SES credentials not configured");
  }

  return new SESClient({
    region: env.AWS_SES_REGION,
    credentials: {
      accessKeyId: env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SES_SECRET_ACCESS_KEY,
    },
  });
};

interface SendEmailParams {
  to: string;
  from: string;
  fromName?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  unsubscribeUrl?: string;
}

/**
 * Send a single email via AWS SES
 */
export async function sendEmail(params: SendEmailParams): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    const sesClient = getSESClient();

    const fromAddress = params.fromName
      ? `${params.fromName} <${params.from}>`
      : params.from;

    // If we have an unsubscribe URL, use SendRawEmailCommand to include custom headers
    if (params.unsubscribeUrl) {
      // Build raw email with List-Unsubscribe headers
      const rawMessage = [
        `From: ${fromAddress}`,
        `To: ${params.to}`,
        ...(params.replyTo ? [`Reply-To: ${params.replyTo}`] : []),
        `Subject: ${params.subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        `List-Unsubscribe: <${params.unsubscribeUrl}>`,
        `List-Unsubscribe-Post: List-Unsubscribe=One-Click`,
        ``,
        params.html,
      ].join("\r\n");

      const command = new SendRawEmailCommand({
        RawMessage: {
          Data: Buffer.from(rawMessage),
        },
      });

      const response = await sesClient.send(command);

      return {
        success: true,
        messageId: response.MessageId,
      };
    }

    // Otherwise use the simpler SendEmailCommand
    const command = new SendEmailCommand({
      Source: fromAddress,
      Destination: {
        ToAddresses: [params.to],
      },
      Message: {
        Subject: {
          Data: params.subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: params.html,
            Charset: "UTF-8",
          },
          ...(params.text && {
            Text: {
              Data: params.text,
              Charset: "UTF-8",
            },
          }),
        },
      },
      ...(params.replyTo && {
        ReplyToAddresses: [params.replyTo],
      }),
    });

    const response = await sesClient.send(command);

    return {
      success: true,
      messageId: response.MessageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send a test email for campaign preview
 */
export async function sendTestEmail(params: {
  testEmail: string;
  campaign: {
    subject: string;
    fromName: string;
    fromEmail: string;
    html: string;
  };
  clubSettings: {
    replyToEmail?: string | null;
  };
}): Promise<{ success: boolean; error?: string }> {
  // Generate test unsubscribe URL with special "test" token
  const testUnsubscribeUrl = generateUnsubscribeLink("test");

  // Inject unsubscribe link into HTML
  const htmlWithUnsubscribe = injectUnsubscribeLink(
    params.campaign.html,
    "test",
  );

  const result = await sendEmail({
    to: params.testEmail,
    from: params.campaign.fromEmail,
    fromName: params.campaign.fromName,
    replyTo: params.clubSettings.replyToEmail ?? undefined,
    subject: `[TEST] ${params.campaign.subject}`,
    html: htmlWithUnsubscribe,
    unsubscribeUrl: testUnsubscribeUrl,
  });

  return {
    success: result.success,
    error: result.error,
  };
}

/**
 * Generate unsubscribe link for a subscriber
 */
export function generateUnsubscribeLink(unsubscribeToken: string): string {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  return `${baseUrl}/unsubscribe?token=${unsubscribeToken}`;
}

/**
 * Inject unsubscribe link into email HTML
 * This function finds the empty unsubscribe paragraph in the template footer and adds the link
 */
export function injectUnsubscribeLink(
  html: string,
  unsubscribeToken: string,
): string {
  const unsubscribeLink = generateUnsubscribeLink(unsubscribeToken);

  // If there's already an unsubscribe placeholder, replace it
  if (html.includes("{{unsubscribe_url}}")) {
    return html.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeLink);
  }

  // Check if there's already an archive URL in the footer (new template structure)
  // Look for "View on the web" link and add unsubscribe before it
  // The pattern matches: <p> followed by optional whitespace, then <a>View on the web</a>
  const archiveUrlPattern =
    /(<p[^>]*style="[^"]*font-size:\s*12px[^"]*"[^>]*>)(\s*)(<a[^>]*href="[^"]*\/archive\/[^"]*"[^>]*>View on the web<\/a>)(\s*)(<\/p>)/i;
  if (archiveUrlPattern.test(html)) {
    // Add unsubscribe link before archive URL with separator
    return html.replace(
      archiveUrlPattern,
      `$1<a href="${unsubscribeLink}" style="color:#3b82f6;text-decoration:underline">Unsubscribe</a> • $3$5`,
    );
  }

  // Look for the empty footer text paragraph that would have contained the unsubscribe link
  // This is generated by the template when unsubscribeUrl is undefined
  // The template renders an empty <p> tag with the footer text style
  const emptyFooterPattern =
    /<p[^>]*style="[^"]*font-size:\s*12px[^"]*"[^>]*>\s*<\/p>/i;

  if (emptyFooterPattern.test(html)) {
    // Replace the empty paragraph with one containing the unsubscribe link
    return html.replace(
      emptyFooterPattern,
      `<p style="font-size:12px;line-height:1.5;color:#8898aa;margin-bottom:8px;margin-top:0"><a href="${unsubscribeLink}" style="color:#3b82f6;text-decoration:underline">Unsubscribe</a></p>`,
    );
  }

  // Fallback: If the template structure has changed, append unsubscribe footer before </body>
  const footer = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666; text-align: center;">
      <p>
        <a href="${unsubscribeLink}" style="color: #3b82f6; text-decoration: underline;">Unsubscribe</a> from this mailing list.
      </p>
    </div>
  `;

  if (html.includes("</body>")) {
    return html.replace("</body>", `${footer}</body>`);
  }

  return html + footer;
}

/**
 * Inject tracking pixel and wrap links for click tracking
 */
export function injectTracking(html: string, trackingToken: string): string {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  // 1. Inject tracking pixel before </body>
  const trackingPixel = `<img src="${baseUrl}/api/track/open/${trackingToken}" width="1" height="1" alt="" style="display:block" />`;

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${trackingPixel}</body>`);
  } else {
    // Fallback: append at the end
    html += trackingPixel;
  }

  // 2. Wrap all links (except unsubscribe) with click tracking
  // Match <a> tags and extract href
  html = html.replace(
    /<a\s+([^>]*href=["']([^"']+)["'][^>]*)>/gi,
    (match, attributes: string, url: string) => {
      // Don't wrap unsubscribe links or tracking links
      if (
        url.includes("/unsubscribe") ||
        url.includes("/api/track/") ||
        url.startsWith("mailto:")
      ) {
        return match;
      }

      // Encode the destination URL
      const encodedUrl = encodeURIComponent(url);
      const trackingUrl = `${baseUrl}/api/track/click/${trackingToken}?url=${encodedUrl}`;

      // Replace the href in the original attributes
      const newAttributes = attributes.replace(
        /href=["'][^"']+["']/i,
        `href="${trackingUrl}"`,
      );

      return `<a ${newAttributes}>`;
    },
  );

  return html;
}

/**
 * Send a campaign email to a subscriber
 */
export async function sendCampaignEmail(params: {
  subscriber: {
    email: string;
    name?: string | null;
    unsubscribeToken: string;
  };
  campaign: {
    subject: string;
    fromName: string;
    fromEmail: string;
    html: string;
  };
  clubSettings: {
    replyToEmail?: string | null;
  };
  trackingToken?: string; // Optional tracking token for open/click tracking
}): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  // Generate unsubscribe URL
  const unsubscribeUrl = generateUnsubscribeLink(
    params.subscriber.unsubscribeToken,
  );

  // Inject unsubscribe link
  let html = injectUnsubscribeLink(
    params.campaign.html,
    params.subscriber.unsubscribeToken,
  );

  // Inject tracking pixel and wrap links if tracking token provided
  if (params.trackingToken) {
    html = injectTracking(html, params.trackingToken);
  }

  // Personalize subject and content if subscriber has a name
  let subject = params.campaign.subject;

  if (params.subscriber.name) {
    subject = subject.replace(/\{\{name\}\}/g, params.subscriber.name);
    html = html.replace(/\{\{name\}\}/g, params.subscriber.name);
  }

  return await sendEmail({
    to: params.subscriber.email,
    from: params.campaign.fromEmail,
    fromName: params.campaign.fromName,
    replyTo: params.clubSettings.replyToEmail ?? undefined,
    subject,
    html,
    unsubscribeUrl,
  });
}

/**
 * Batch send emails with rate limiting
 * AWS SES has rate limits, so we need to throttle sends
 *
 * IMPORTANT: This function works on Vercel but with limitations:
 * - Serverless functions have 10s (Hobby) or 60s (Pro) timeouts
 * - For large campaigns (>100 emails), consider using a queue system like Upstash QStash
 * - This implementation will throw an error if rate limit is exceeded
 * - Campaign sending will pause and can be resumed when limits reset
 */
export async function batchSendCampaignEmails(params: {
  subscribers: Array<{
    id: string;
    email: string;
    name?: string | null;
    unsubscribeToken: string;
    trackingToken?: string; // Optional tracking token from Email record
  }>;
  campaign: {
    subject: string;
    fromName: string;
    fromEmail: string;
    html: string;
  };
  clubSettings: {
    replyToEmail?: string | null;
  };
  onProgress?: (sent: number, total: number) => void;
  maxPerSecond?: number; // Default SES limit is 14 emails/second for most accounts
}): Promise<{
  sent: number;
  failed: number;
  rateLimited: boolean;
  results: Array<{
    subscriberId: string;
    success: boolean;
    messageId?: string;
    error?: string;
  }>;
}> {
  // Check rate limit before starting
  const rateLimitCheck = await checkRateLimit(params.subscribers.length);

  if (!rateLimitCheck.allowed) {
    console.error("Rate limit exceeded:", rateLimitCheck.reason);
    console.error(
      `Current: ${rateLimitCheck.currentCount}/${rateLimitCheck.limit}`,
    );
    console.error(
      `Reset time: ${rateLimitCheck.resetTime?.toISOString() ?? "unknown"}`,
    );

    // Return early - no emails sent
    return {
      sent: 0,
      failed: 0,
      rateLimited: true,
      results: params.subscribers.map((sub) => ({
        subscriberId: sub.id,
        success: false,
        error: `${rateLimitCheck.reason}. Limit: ${rateLimitCheck.limit}, Current: ${rateLimitCheck.currentCount}, Reset: ${rateLimitCheck.resetTime?.toISOString()}`,
      })),
    };
  }

  const maxPerSecond = params.maxPerSecond ?? 10; // Conservative default
  const delayMs = 1000 / maxPerSecond;

  const results: Array<{
    subscriberId: string;
    success: boolean;
    messageId?: string;
    error?: string;
  }> = [];

  let sent = 0;
  let failed = 0;
  let rateLimited = false;

  for (let i = 0; i < params.subscribers.length; i++) {
    const subscriber = params.subscribers[i]!;

    // Check rate limit before each batch (every 10 emails or as configured)
    if (i > 0 && i % 10 === 0) {
      const batchCheck = await checkRateLimit(params.subscribers.length - i);
      if (!batchCheck.allowed) {
        console.warn(
          `Rate limit hit mid-campaign: ${batchCheck.reason}. Sent ${sent}/${params.subscribers.length}`,
        );
        rateLimited = true;

        // Mark remaining emails as failed due to rate limit
        for (let j = i; j < params.subscribers.length; j++) {
          const remainingSub = params.subscribers[j]!;
          results.push({
            subscriberId: remainingSub.id,
            success: false,
            error: `${batchCheck.reason}. Resume after ${batchCheck.resetTime?.toISOString()}`,
          });
          failed++;
        }
        break;
      }
    }

    const result = await sendCampaignEmail({
      subscriber,
      campaign: params.campaign,
      clubSettings: params.clubSettings,
      trackingToken: subscriber.trackingToken,
    });

    results.push({
      subscriberId: subscriber.id,
      success: result.success,
      messageId: result.messageId,
      error: result.error,
    });

    if (result.success) {
      sent++;
    } else {
      failed++;
    }

    // Call progress callback
    params.onProgress?.(sent + failed, params.subscribers.length);

    // Rate limiting delay (except for the last email)
    if (i < params.subscribers.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return { sent, failed, rateLimited, results };
}
