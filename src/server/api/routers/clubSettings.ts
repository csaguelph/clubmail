import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  checkClubPermission,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const clubSettingsRouter = createTRPCRouter({
  // Get club settings
  getSettings: protectedProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      const settings = await ctx.db.clubSettings.findUnique({
        where: { clubId: input.clubId },
      });

      if (!settings) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Settings not found for this club",
        });
      }

      return settings;
    }),

  // Update club settings
  updateSettings: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        fromName: z.string().min(1).optional(),
        fromEmailSlug: z
          .string()
          .min(1)
          .max(64)
          .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
          .optional(),
        replyToEmail: z.string().email().optional().nullable(),
        defaultSubjectPrefix: z.string().optional().nullable(),
        brandColor: z
          .string()
          .regex(/^#[0-9A-Fa-f]{6}$/)
          .optional(),
        enableTracking: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, ["CLUB_OWNER"]);

      const { clubId, ...updateData } = input;

      const settings = await ctx.db.clubSettings.update({
        where: { clubId },
        data: updateData,
      });

      return settings;
    }),
});
