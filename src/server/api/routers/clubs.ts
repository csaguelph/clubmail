import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  clubViewerProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const clubsRouter = createTRPCRouter({
  // List clubs the current user is a member of (legacy - use listMyClubsInfinite for better performance)
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

  // List clubs with pagination and search
  listMyClubsInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, search } = input;

      // Check if user is admin
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      if (user?.role === "ADMIN") {
        // Admin: get all active clubs
        const clubs = await ctx.db.club.findMany({
          where: {
            isActive: true,
            ...(search
              ? {
                  OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { slug: { contains: search, mode: "insensitive" } },
                  ],
                }
              : {}),
          },
          orderBy: { name: "asc" },
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
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

        let nextCursor: string | undefined = undefined;
        if (clubs.length > limit) {
          const nextItem = clubs.pop();
          nextCursor = nextItem?.id;
        }

        return {
          clubs,
          nextCursor,
        };
      }

      // Non-admin: get clubs the user is a member of
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
        orderBy: { club: { name: "asc" } },
      });

      const activeClubsWithRole = memberships
        .filter((m) => m.club.isActive)
        .map((m) => ({
          ...m.club,
          myRole: m.role,
        }));

      // Apply search filter
      const filteredClubs = search
        ? activeClubsWithRole.filter(
            (club) =>
              club.name.toLowerCase().includes(search.toLowerCase()) ||
              club.slug.toLowerCase().includes(search.toLowerCase()),
          )
        : activeClubsWithRole;

      // Manual pagination for non-admin (since we're filtering in memory)
      const startIndex = cursor
        ? filteredClubs.findIndex((c) => c.id === cursor) + 1
        : 0;
      const paginatedClubs = filteredClubs.slice(
        startIndex,
        startIndex + limit + 1,
      );

      let nextCursor: string | undefined = undefined;
      if (paginatedClubs.length > limit) {
        const nextItem = paginatedClubs.pop();
        nextCursor = nextItem?.id;
      }

      return {
        clubs: paginatedClubs,
        nextCursor,
      };
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
                  role: true,
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
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      // Admins get CLUB_OWNER permissions
      if (user?.role === "ADMIN") {
        return {
          ...club,
          myRole: "CLUB_OWNER" as const,
        };
      }

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

      if (!club?.isActive) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      return club;
    }),
});
