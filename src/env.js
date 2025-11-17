import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    BETTER_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    BETTER_AUTH_GITHUB_CLIENT_ID: z.string().optional(),
    BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string().optional(),
    MICROSOFT_CLIENT_ID: z.string(),
    MICROSOFT_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    // AWS SES configuration for sending emails
    AWS_SES_REGION: z.string().optional(), // AWS region (e.g., us-east-1)
    AWS_SES_ACCESS_KEY_ID: z.string().optional(), // AWS access key
    AWS_SES_SECRET_ACCESS_KEY: z.string().optional(), // AWS secret key
    AWS_SES_FROM_EMAIL: z.string().email().optional(), // Verified sender email address
    // Upstash QStash configuration for async email queue
    QSTASH_URL: z.string().url().optional(), // QStash API URL (usually https://qstash.upstash.io)
    QSTASH_TOKEN: z.string().optional(), // QStash API token
    QSTASH_CURRENT_SIGNING_KEY: z.string().optional(), // For verifying webhook signatures
    QSTASH_NEXT_SIGNING_KEY: z.string().optional(), // For key rotation
    // Cloudflare R2 configuration for media uploads
    R2_ACCOUNT_ID: z.string().optional(), // Cloudflare account ID
    R2_ACCESS_KEY_ID: z.string().optional(), // R2 access key
    R2_SECRET_ACCESS_KEY: z.string().optional(), // R2 secret key
    R2_BUCKET_NAME: z.string().optional(), // R2 bucket name
    R2_PUBLIC_URL: z.string().url().optional(), // Public URL for R2 bucket (e.g., https://media.example.com)
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_BASE_URL: z
      .string()
      .url()
      .refine((url) => !url.endsWith("/")),
    NEXT_PUBLIC_GIT_COMMIT_SHA: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // Server:
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_GITHUB_CLIENT_ID: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
    BETTER_AUTH_GITHUB_CLIENT_SECRET:
      process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
    AWS_SES_REGION: process.env.AWS_SES_REGION,
    AWS_SES_ACCESS_KEY_ID: process.env.AWS_SES_ACCESS_KEY_ID,
    AWS_SES_SECRET_ACCESS_KEY: process.env.AWS_SES_SECRET_ACCESS_KEY,
    AWS_SES_FROM_EMAIL: process.env.AWS_SES_FROM_EMAIL,
    QSTASH_URL: process.env.QSTASH_URL,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,

    // Client:
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT ?? 3000}`),
    NEXT_PUBLIC_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
