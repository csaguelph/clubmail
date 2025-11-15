import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  clubOwnerProcedure,
  clubViewerProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";

export const clubMembersRouter = createTRPCRouter({
  // List members of a club
  listMembers: clubViewerProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      const members = await ctx.db.clubMember.findMany({
        where: { clubId: input.clubId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: [
          { role: "asc" }, // CLUB_OWNER first
          { createdAt: "asc" },
        ],
      });

      return members;
    }),

  // Add a member to a club
  addMember: clubOwnerProcedure
    .input(
      z.object({
        clubId: z.string(),
        userEmail: z.string().email(),
        role: z.enum(["CLUB_OWNER", "CLUB_EDITOR", "CLUB_VIEWER"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Find user by email
      let user = await ctx.db.user.findUnique({
        where: { email: input.userEmail },
      });

      // If user doesn't exist, create stub user
      user ??= await ctx.db.user.create({
        data: {
          id: `stub_${Date.now()}_${Math.random()}`,
          email: input.userEmail,
          name: input.userEmail.split("@")[0] ?? "User",
          emailVerified: false,
        },
      });

      // Check if already a member
      const existingMember = await ctx.db.clubMember.findUnique({
        where: {
          clubId_userId: {
            clubId: input.clubId,
            userId: user.id,
          },
        },
      });

      if (existingMember) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User is already a member of this club",
        });
      }

      // Add member
      const member = await ctx.db.clubMember.create({
        data: {
          clubId: input.clubId,
          userId: user.id,
          role: input.role,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return member;
    }),

  // Update a member's role
  updateMemberRole: clubOwnerProcedure
    .input(
      z.object({
        clubId: z.string(),
        userId: z.string(),
        role: z.enum(["CLUB_OWNER", "CLUB_EDITOR", "CLUB_VIEWER"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if member exists
      const member = await ctx.db.clubMember.findUnique({
        where: {
          clubId_userId: {
            clubId: input.clubId,
            userId: input.userId,
          },
        },
      });

      if (!member) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Member not found",
        });
      }

      // Prevent removing the last owner
      if (member.role === "CLUB_OWNER" && input.role !== "CLUB_OWNER") {
        const ownerCount = await ctx.db.clubMember.count({
          where: {
            clubId: input.clubId,
            role: "CLUB_OWNER",
          },
        });

        if (ownerCount <= 1) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot remove the last owner of the club",
          });
        }
      }

      // Update role
      const updatedMember = await ctx.db.clubMember.update({
        where: {
          clubId_userId: {
            clubId: input.clubId,
            userId: input.userId,
          },
        },
        data: {
          role: input.role,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return updatedMember;
    }),

  // Remove a member from a club
  removeMember: clubOwnerProcedure
    .input(
      z.object({
        clubId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if member exists
      const member = await ctx.db.clubMember.findUnique({
        where: {
          clubId_userId: {
            clubId: input.clubId,
            userId: input.userId,
          },
        },
      });

      if (!member) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Member not found",
        });
      }

      // Prevent removing the last owner
      if (member.role === "CLUB_OWNER") {
        const ownerCount = await ctx.db.clubMember.count({
          where: {
            clubId: input.clubId,
            role: "CLUB_OWNER",
          },
        });

        if (ownerCount <= 1) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot remove the last owner of the club",
          });
        }
      }

      // Remove member
      await ctx.db.clubMember.delete({
        where: {
          clubId_userId: {
            clubId: input.clubId,
            userId: input.userId,
          },
        },
      });

      return { success: true };
    }),
});
