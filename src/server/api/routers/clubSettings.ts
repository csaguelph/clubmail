import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  checkClubPermission,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  cuidSchema,
  emailSchema,
  emailSlugSchema,
  hexColorSchema,
} from "@/server/api/validators";

export const clubSettingsRouter = createTRPCRouter({
  // Get club settings
  getSettings: protectedProcedure
    .input(z.object({ clubId: cuidSchema }))
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
        clubId: cuidSchema,
        fromName: z.string().min(1).max(255).optional(),
        fromEmailSlug: emailSlugSchema.optional(),
        replyToEmail: emailSchema.optional().nullable(),
        defaultSubjectPrefix: z.string().max(255).optional().nullable(),
        brandColor: hexColorSchema.optional(),
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
