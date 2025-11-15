import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  clubViewerProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const clubsRouter = createTRPCRouter({
  // List clubs the current user is a member of
  listMyClubs: protectedProcedure.query(async ({ ctx }) => {
    // Check if user is admin
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { role: true },
    });

    // If admin, return all clubs
    if (user?.role === "ADMIN") {
      return await ctx.db.club.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        include: {
          settings: true,
          _count: {
            select: {
              members: true,
              campaigns: true,
              subscribers: true,
            },
          },
        },
      });
    }

    // Otherwise, return only clubs the user is a member of
    const memberships = await ctx.db.clubMember.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        club: {
          include: {
            settings: true,
            _count: {
              select: {
                members: true,
                campaigns: true,
                subscribers: true,
              },
            },
          },
        },
      },
    });

    return memberships
      .filter((m) => m.club.isActive)
      .map((m) => ({
        ...m.club,
        myRole: m.role,
      }));
  }),

  // Get detailed information about a specific club
  getClubDetails: clubViewerProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          settings: true,
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          emailLists: {
            orderBy: {
              isDefault: "desc",
            },
          },
          _count: {
            select: {
              campaigns: true,
              subscribers: true,
            },
          },
        },
      });

      if (!club) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      // Get user's role in this club
      const membership = await ctx.db.clubMember.findUnique({
        where: {
          clubId_userId: {
            clubId: input.clubId,
            userId: ctx.session.user.id,
          },
        },
      });

      return {
        ...club,
        myRole: membership?.role,
      };
    }),

  // Get club by slug (useful for public-facing pages)
  getClubBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { slug: input.slug },
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true,
        },
      });

      if (!club) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      // Check if user has access to this club
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      if (user?.role !== "ADMIN") {
        const membership = await ctx.db.clubMember.findUnique({
          where: {
            clubId_userId: {
              clubId: club.id,
              userId: ctx.session.user.id,
            },
          },
        });

        if (!membership) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have access to this club",
          });
        }
      }

      return club;
    }),

  // Get public club info for subscription page
  getPublicClubInfo: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { slug: input.slug },
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true,
          settings: {
            select: {
              fromName: true,
            },
          },
          _count: {
            select: {
              subscribers: {
                where: {
                  status: "SUBSCRIBED",
                },
              },
            },
          },
        },
      });

      if (!club || !club.isActive) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      return club;
    }),
});
