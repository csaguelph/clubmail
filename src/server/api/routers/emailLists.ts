import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  checkClubPermission,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const emailListsRouter = createTRPCRouter({
  // List email lists for a club
  listLists: protectedProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      const lists = await ctx.db.emailList.findMany({
        where: { clubId: input.clubId },
        orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
        include: {
          _count: {
            select: {
              memberships: true,
              campaigns: true,
            },
          },
        },
      });

      return lists;
    }),

  // Get default list for a club
  getDefaultList: protectedProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      const list = await ctx.db.emailList.findFirst({
        where: {
          clubId: input.clubId,
          isDefault: true,
        },
        include: {
          _count: {
            select: {
              memberships: true,
              campaigns: true,
            },
          },
        },
      });

      if (!list) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Default list not found for this club",
        });
      }

      return list;
    }),

  // Get a specific list
  getList: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        listId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      const list = await ctx.db.emailList.findFirst({
        where: {
          id: input.listId,
          clubId: input.clubId,
        },
        include: {
          _count: {
            select: {
              memberships: true,
              campaigns: true,
            },
          },
        },
      });

      if (!list) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email list not found",
        });
      }

      return list;
    }),

  // Create a new email list
  createList: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        name: z.string().min(1).max(255),
        description: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      const list = await ctx.db.emailList.create({
        data: {
          clubId: input.clubId,
          name: input.name,
          description: input.description,
          isDefault: false,
        },
      });

      return list;
    }),

  // Update an email list
  updateList: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        listId: z.string(),
        name: z.string().min(1).max(255).optional(),
        description: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      const { clubId, listId, ...updateData } = input;

      // Verify list belongs to club
      const list = await ctx.db.emailList.findFirst({
        where: {
          id: listId,
          clubId,
        },
      });

      if (!list) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email list not found",
        });
      }

      const updatedList = await ctx.db.emailList.update({
        where: { id: listId },
        data: updateData,
      });

      return updatedList;
    }),

  // Delete an email list
  deleteList: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        listId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
      ]);

      // Verify list belongs to club
      const list = await ctx.db.emailList.findFirst({
        where: {
          id: input.listId,
          clubId: input.clubId,
        },
      });

      if (!list) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email list not found",
        });
      }

      // Prevent deleting default list
      if (list.isDefault) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete the default email list",
        });
      }

      await ctx.db.emailList.delete({
        where: { id: input.listId },
      });

      return { success: true };
    }),
});
