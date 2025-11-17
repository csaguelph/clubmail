import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "sqlite" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
    },
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/github`,
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
