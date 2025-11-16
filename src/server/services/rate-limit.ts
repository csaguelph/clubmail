import { db } from "@/server/db";

/**
 * Email Rate Limiting Service
 *
 * Manages email throughput to comply with AWS SES quotas.
 * Uses the existing Email model to track sends.
 */

export interface RateLimitStatus {
  allowed: boolean;
  reason?: string;
  currentCount?: number;
  limit?: number;
  resetTime?: Date;
}

/**
 * Get platform rate limiting settings
 */
async function getRateLimitSettings() {
  let settings = await db.platformSettings.findUnique({
    where: { id: "platform_settings" },
    select: {
      enableRateLimiting: true,
      maxEmailsPerDay: true,
      maxEmailsPerSecond: true,
    },
  });

  // Create defaults if they don't exist
  if (!settings) {
    const created = await db.platformSettings.create({
      data: {
        id: "platform_settings",
        softBounceThreshold: 2,
        hardBounceAction: "BLOCK",
        complaintThreshold: 1,
        complaintAction: "UNSUBSCRIBE",
        enableAutoCleanup: true,
        maxEmailsPerDay: 50000,
        maxEmailsPerSecond: 14,
        enableRateLimiting: true,
      },
      select: {
        enableRateLimiting: true,
        maxEmailsPerDay: true,
        maxEmailsPerSecond: true,
      },
    });
    settings = created;
  }

  return settings;
}

/**
 * Check if sending is allowed based on current rate limits
 *
 * @param emailsToSend - Number of emails planning to send (optional, defaults to 1)
 * @returns RateLimitStatus indicating if send is allowed
 */
export async function checkRateLimit(
  emailsToSend: number = 1,
): Promise<RateLimitStatus> {
  const settings = await getRateLimitSettings();

  // If rate limiting is disabled, always allow
  if (!settings.enableRateLimiting) {
    return { allowed: true };
  }

  const now = new Date();

  // Check per-second limit
  const oneSecondAgo = new Date(now.getTime() - 1000);
  const emailsInLastSecond = await db.email.count({
    where: {
      sentAt: {
        gte: oneSecondAgo,
      },
      status: {
        in: ["SENT", "DELIVERED"], // Count successfully sent emails
      },
    },
  });

  if (emailsInLastSecond + emailsToSend > settings.maxEmailsPerSecond) {
    const resetTime = new Date(oneSecondAgo.getTime() + 1000);
    return {
      allowed: false,
      reason: "Per-second rate limit exceeded",
      currentCount: emailsInLastSecond,
      limit: settings.maxEmailsPerSecond,
      resetTime,
    };
  }

  // Check per-day limit
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const emailsInLastDay = await db.email.count({
    where: {
      sentAt: {
        gte: oneDayAgo,
      },
      status: {
        in: ["SENT", "DELIVERED"],
      },
    },
  });

  if (emailsInLastDay + emailsToSend > settings.maxEmailsPerDay) {
    const resetTime = new Date(oneDayAgo.getTime() + 24 * 60 * 60 * 1000);
    return {
      allowed: false,
      reason: "Daily rate limit exceeded",
      currentCount: emailsInLastDay,
      limit: settings.maxEmailsPerDay,
      resetTime,
    };
  }

  return {
    allowed: true,
    currentCount: emailsInLastDay,
    limit: settings.maxEmailsPerDay,
  };
}

/**
 * Get current usage statistics
 */
export async function getRateLimitUsage() {
  const settings = await getRateLimitSettings();
  const now = new Date();

  const [emailsInLastSecond, emailsInLastDay] = await Promise.all([
    db.email.count({
      where: {
        sentAt: { gte: new Date(now.getTime() - 1000) },
        status: { in: ["SENT", "DELIVERED"] },
      },
    }),
    db.email.count({
      where: {
        sentAt: { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
        status: { in: ["SENT", "DELIVERED"] },
      },
    }),
  ]);

  return {
    perSecond: {
      current: emailsInLastSecond,
      limit: settings.maxEmailsPerSecond,
      percentage: (emailsInLastSecond / settings.maxEmailsPerSecond) * 100,
    },
    perDay: {
      current: emailsInLastDay,
      limit: settings.maxEmailsPerDay,
      percentage: (emailsInLastDay / settings.maxEmailsPerDay) * 100,
    },
    enabled: settings.enableRateLimiting,
  };
}

/**
 * Calculate delay needed to respect rate limits
 *
 * @param emailsToSend - Total emails to send
 * @returns Delay in milliseconds between batches
 */
export async function calculateSendDelay(
  emailsToSend: number,
): Promise<number> {
  const settings = await getRateLimitSettings();

  if (!settings.enableRateLimiting) {
    return 0;
  }

  // Use the more restrictive of the two limits
  const delayForPerSecond = 1000 / settings.maxEmailsPerSecond;
  const delayForPerDay = (24 * 60 * 60 * 1000) / settings.maxEmailsPerDay;

  // Return the larger delay to satisfy both limits
  return Math.max(delayForPerSecond, delayForPerDay);
}
