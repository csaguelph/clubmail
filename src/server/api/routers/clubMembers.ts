import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  checkClubPermission,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  clubRoleSchema,
  cuidSchema,
  emailSchema,
} from "@/server/api/validators";

export const clubMembersRouter = createTRPCRouter({
  // List members of a club
  listMembers: protectedProcedure
    .input(z.object({ clubId: cuidSchema }))
    .query(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, [
        "CLUB_OWNER",
        "CLUB_EDITOR",
        "CLUB_VIEWER",
      ]);

      const members = await ctx.db.clubMember.findMany({
        where: { clubId: input.clubId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
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
  addMember: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        userEmail: emailSchema,
        role: clubRoleSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, ["CLUB_OWNER"]);

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
            },
          },
        },
      });

      return member;
    }),

  // Update a member's role
  updateMemberRole: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        userId: z.string(),
        role: clubRoleSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, ["CLUB_OWNER"]);

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
            },
          },
        },
      });

      return updatedMember;
    }),

  // Remove a member from a club
  removeMember: protectedProcedure
    .input(
      z.object({
        clubId: cuidSchema,
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await checkClubPermission(ctx, input.clubId, ["CLUB_OWNER"]);

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
