import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    clubOwnerProcedure,
    clubViewerProcedure,
    createTRPCRouter,
} from "@/server/api/trpc";

export const clubSettingsRouter = createTRPCRouter({
  // Get club settings
  getSettings: clubViewerProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
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
  updateSettings: clubOwnerProcedure
    .input(
      z.object({
        clubId: z.string(),
        fromName: z.string().min(1).optional(),
        replyToEmail: z.string().email().optional().nullable(),
        defaultSubjectPrefix: z.string().optional().nullable(),
        brandColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, ...updateData } = input;

      const settings = await ctx.db.clubSettings.update({
        where: { clubId },
        data: updateData,
      });

      return settings;
    }),
});
