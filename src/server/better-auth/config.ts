import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
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
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/callback/:id") {
        const newUser = ctx.context?.newSession?.user;
        const email = newUser?.email;
        const url = ctx.request?.url ?? "";
        const isMicrosoft = url.includes("microsoft");

        // Restrict Microsoft OAuth to @uoguelph.ca emails only
        if (isMicrosoft && email && !email.endsWith("@uoguelph.ca")) {
          console.error("Blocking non-UofG Microsoft email:", email);

          if (newUser?.id) {
            await db.account.deleteMany({
              where: { userId: newUser.id },
            });
            await db.user.delete({
              where: { id: newUser.id },
            });
          }

          throw ctx.redirect(
            `${env.NEXT_PUBLIC_BASE_URL}/login?error=domain_restricted`,
          );
        }

        // Update user name from Microsoft OAuth token
        if (newUser?.id && isMicrosoft) {
          const account = await db.account.findFirst({
            where: {
              userId: newUser.id,
              providerId: "microsoft",
            },
          });

          if (account?.idToken) {
            try {
              // Decode JWT payload to get user's name from Microsoft
              const payload = JSON.parse(
                Buffer.from(
                  account.idToken.split(".")[1]!,
                  "base64",
                ).toString(),
              ) as { name?: string };

              if (payload.name) {
                await db.user.update({
                  where: { id: newUser.id },
                  data: { name: payload.name },
                });
              }
            } catch (error) {
              console.error("Failed to decode ID token:", error);
            }
          }
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
