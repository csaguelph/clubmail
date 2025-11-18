import { z } from "zod";
import {
  UserRole,
  ClubRole,
  SubscriberStatus,
  CampaignStatus,
  EmailStatus,
  BounceType,
} from "../../../generated/prisma";

/**
 * Prisma Enum Zod Schemas
 *
 * These schemas are derived from Prisma enums to ensure type safety
 * and consistency across all tRPC routers.
 */

export const userRoleSchema = z.nativeEnum(UserRole);
export const clubRoleSchema = z.nativeEnum(ClubRole);
export const subscriberStatusSchema = z.nativeEnum(SubscriberStatus);
export const campaignStatusSchema = z.nativeEnum(CampaignStatus);
export const emailStatusSchema = z.nativeEnum(EmailStatus);
export const bounceTypeSchema = z.nativeEnum(BounceType);

/**
 * Common validation schemas
 */
export const cuidSchema = z.string().cuid();
export const emailSchema = z.string().email();
export const slugSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(
    /^[a-z0-9-]+$/,
    "Slug must contain only lowercase letters, numbers, and hyphens",
  );
export const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #b1d135)");
export const emailSlugSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(
    /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    "Email slug must be lowercase alphanumeric with optional hyphens",
  );
