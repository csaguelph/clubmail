import { env } from "@/env";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

/**
 * AWS SES Email Service
 * 
 * This service handles all email sending operations using AWS SES.
 */

// Initialize SES client
const getSESClient = () => {
  if (!env.AWS_SES_REGION || !env.AWS_SES_ACCESS_KEY_ID || !env.AWS_SES_SECRET_ACCESS_KEY) {
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
  const result = await sendEmail({
    to: params.testEmail,
    from: params.campaign.fromEmail,
    fromName: params.campaign.fromName,
    replyTo: params.clubSettings.replyToEmail ?? undefined,
    subject: `[TEST] ${params.campaign.subject}`,
    html: params.campaign.html,
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}/unsubscribe?token=${unsubscribeToken}`;
}

/**
 * Inject unsubscribe link into email HTML
 */
export function injectUnsubscribeLink(html: string, unsubscribeToken: string): string {
  const unsubscribeLink = generateUnsubscribeLink(unsubscribeToken);
  
  // If there's already an unsubscribe placeholder, replace it
  if (html.includes("{{unsubscribe_url}}")) {
    return html.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeLink);
  }
  
  // Otherwise, append unsubscribe footer
  const footer = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666; text-align: center;">
      <p>
        <a href="${unsubscribeLink}" style="color: #666; text-decoration: underline;">Unsubscribe</a> from this mailing list.
      </p>
    </div>
  `;
  
  // Try to inject before closing body tag, otherwise append
  if (html.includes("</body>")) {
    return html.replace("</body>", `${footer}</body>`);
  }
  
  return html + footer;
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
}): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  // Inject unsubscribe link
  const htmlWithUnsubscribe = injectUnsubscribeLink(
    params.campaign.html,
    params.subscriber.unsubscribeToken
  );
  
  // Personalize subject and content if subscriber has a name
  let subject = params.campaign.subject;
  let html = htmlWithUnsubscribe;
  
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
  });
}

/**
 * Batch send emails with rate limiting
 * AWS SES has rate limits, so we need to throttle sends
 */
export async function batchSendCampaignEmails(params: {
  subscribers: Array<{
    id: string;
    email: string;
    name?: string | null;
    unsubscribeToken: string;
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
  results: Array<{
    subscriberId: string;
    success: boolean;
    messageId?: string;
    error?: string;
  }>;
}> {
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
  
  for (let i = 0; i < params.subscribers.length; i++) {
    const subscriber = params.subscribers[i]!;
    
    const result = await sendCampaignEmail({
      subscriber,
      campaign: params.campaign,
      clubSettings: params.clubSettings,
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
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return { sent, failed, results };
}
