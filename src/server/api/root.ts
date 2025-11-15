import { adminRouter } from "@/server/api/routers/admin";
import { campaignsRouter } from "@/server/api/routers/campaigns";
import { clubMembersRouter } from "@/server/api/routers/clubMembers";
import { clubsRouter } from "@/server/api/routers/clubs";
import { clubSettingsRouter } from "@/server/api/routers/clubSettings";
import { emailListsRouter } from "@/server/api/routers/emailLists";
import { subscribersRouter } from "@/server/api/routers/subscribers";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  clubs: clubsRouter,
  clubMembers: clubMembersRouter,
  clubSettings: clubSettingsRouter,
  emailLists: emailListsRouter,
  subscribers: subscribersRouter,
  campaigns: campaignsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
