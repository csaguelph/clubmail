import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
      redirectURI: `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/microsoft`,
    },
    // Only enable GitHub in dev when credentials are available
    ...(env.BETTER_AUTH_GITHUB_CLIENT_ID && env.BETTER_AUTH_GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
            redirectURI: `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/github`,
          },
        }
      : {}),
  },
  plugins: [nextCookies()],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Restrict Microsoft OAuth to @uoguelph.ca emails only
      if (ctx.path === "/callback/microsoft") {
        const email = ctx.body?.email || ctx.context?.user?.email;

        if (email && !email.endsWith("@uoguelph.ca")) {
          throw new APIError("FORBIDDEN", {
            message:
              "Access restricted to @uoguelph.ca email addresses only. Please sign in with your University of Guelph email.",
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
