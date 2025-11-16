import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import {
  deleteFromR2,
  getImageDimensions,
  isR2Configured,
  uploadToR2,
  validateMediaFile,
} from "@/server/services/r2-storage";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

/**
 * Helper function to check if user is admin
 */
async function isUserAdmin(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === "ADMIN";
}

export const mediaRouter = createTRPCRouter({
  /**
   * Check if R2 storage is configured
   */
  isConfigured: protectedProcedure.query(() => {
    return { configured: isR2Configured() };
  }),

  /**
   * Upload media file
   */
  upload: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        mimeType: z.string(),
        base64Data: z.string(), // Base64 encoded file data
        clubId: z.string().optional(),
        altText: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!isR2Configured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "Media uploads are not configured. Please contact your administrator.",
        });
      }

      // Validate club access if clubId is provided
      if (input.clubId) {
        const membership = await db.clubMember.findFirst({
          where: {
            clubId: input.clubId,
            userId: ctx.session.user.id,
          },
        });

        if (!membership && !(await isUserAdmin(ctx.session.user.id))) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have access to this club",
          });
        }
      }

      // Decode base64 data
      const buffer = Buffer.from(input.base64Data, "base64");

      // Validate file
      const validation = validateMediaFile(input.mimeType, buffer.length);
      if (!validation.valid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: validation.error,
        });
      }

      // Get image dimensions if it's an image
      let dimensions: { width: number; height: number } | null = null;
      if (input.mimeType.startsWith("image/")) {
        dimensions = await getImageDimensions(buffer, input.mimeType);
      }

      // Upload to R2
      const uploadResult = await uploadToR2(
        buffer,
        input.filename,
        input.mimeType,
        input.clubId,
      );

      // Save to database
      const media = await db.media.create({
        data: {
          filename: input.filename,
          key: uploadResult.key,
          url: uploadResult.url,
          mimeType: input.mimeType,
          size: uploadResult.size,
          width: dimensions?.width,
          height: dimensions?.height,
          altText: input.altText,
          clubId: input.clubId,
          uploadedById: ctx.session.user.id,
        },
      });

      return media;
    }),

  /**
   * List media files
   */
  list: protectedProcedure
    .input(
      z.object({
        clubId: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
        mimeTypeFilter: z
          .enum(["image", "document", "all"])
          .default("all")
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Build where clause
      const where: {
        clubId?: string | null;
        uploadedById?: string;
        mimeType?: { startsWith: string };
      } = {};

      if (input.clubId) {
        // Validate club access
        const membership = await db.clubMember.findFirst({
          where: {
            clubId: input.clubId,
            userId: ctx.session.user.id,
          },
        });

        if (!membership && !(await isUserAdmin(ctx.session.user.id))) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have access to this club",
          });
        }

        where.clubId = input.clubId;
      } else if (!(await isUserAdmin(ctx.session.user.id))) {
        // Non-admin users can only see their own uploads or club uploads
        where.uploadedById = ctx.session.user.id;
      }

      // Filter by MIME type
      if (input.mimeTypeFilter === "image") {
        where.mimeType = { startsWith: "image/" };
      } else if (input.mimeTypeFilter === "document") {
        where.mimeType = { startsWith: "application/" };
      }

      const media = await db.media.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          club: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

      let nextCursor: string | undefined = undefined;
      if (media.length > input.limit) {
        const nextItem = media.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items: media,
        nextCursor,
      };
    }),

  /**
   * Get media by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const media = await db.media.findUnique({
        where: { id: input.id },
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          club: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

      if (!media) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      // Check access
      if (media.clubId) {
        const membership = await db.clubMember.findFirst({
          where: {
            clubId: media.clubId,
            userId: ctx.session.user.id,
          },
        });

        if (!membership && !(await isUserAdmin(ctx.session.user.id))) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have access to this media",
          });
        }
      } else if (
        media.uploadedById !== ctx.session.user.id &&
        !(await isUserAdmin(ctx.session.user.id))
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have access to this media",
        });
      }

      return media;
    }),

  /**
   * Update media metadata
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        altText: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const media = await db.media.findUnique({
        where: { id: input.id },
      });

      if (!media) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      // Check access
      if (media.clubId) {
        const membership = await db.clubMember.findFirst({
          where: {
            clubId: media.clubId,
            userId: ctx.session.user.id,
            role: {
              in: ["CLUB_OWNER", "CLUB_EDITOR"],
            },
          },
        });

        if (!membership && !(await isUserAdmin(ctx.session.user.id))) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have permission to update this media",
          });
        }
      } else if (
        media.uploadedById !== ctx.session.user.id &&
        !(await isUserAdmin(ctx.session.user.id))
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to update this media",
        });
      }

      return db.media.update({
        where: { id: input.id },
        data: {
          altText: input.altText,
        },
      });
    }),

  /**
   * Delete media
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const media = await db.media.findUnique({
        where: { id: input.id },
      });

      if (!media) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }

      // Check access
      if (media.clubId) {
        const membership = await db.clubMember.findFirst({
          where: {
            clubId: media.clubId,
            userId: ctx.session.user.id,
            role: {
              in: ["CLUB_OWNER", "CLUB_EDITOR"],
            },
          },
        });

        if (!membership && !(await isUserAdmin(ctx.session.user.id))) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have permission to delete this media",
          });
        }
      } else if (
        media.uploadedById !== ctx.session.user.id &&
        !(await isUserAdmin(ctx.session.user.id))
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this media",
        });
      }

      // Delete from R2
      try {
        await deleteFromR2(media.key);
      } catch (error) {
        console.error("Failed to delete from R2:", error);
        // Continue with database deletion even if R2 deletion fails
      }

      // Delete from database
      await db.media.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  /**
   * Bulk delete media (admin only)
   */
  bulkDelete: adminProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const mediaItems = await db.media.findMany({
        where: { id: { in: input.ids } },
      });

      // Delete from R2
      const deletePromises = mediaItems.map((media) =>
        deleteFromR2(media.key).catch((error) => {
          console.error(`Failed to delete ${media.key} from R2:`, error);
        }),
      );

      await Promise.all(deletePromises);

      // Delete from database
      await db.media.deleteMany({
        where: { id: { in: input.ids } },
      });

      return { deleted: mediaItems.length };
    }),

  /**
   * Get storage statistics
   */
  getStats: adminProcedure.query(async () => {
    const stats = await db.media.aggregate({
      _count: true,
      _sum: {
        size: true,
      },
    });

    const byClub = await db.media.groupBy({
      by: ["clubId"],
      _count: true,
      _sum: {
        size: true,
      },
    });

    const byMimeType = await db.media.groupBy({
      by: ["mimeType"],
      _count: true,
      _sum: {
        size: true,
      },
    });

    return {
      totalFiles: stats._count,
      totalSize: stats._sum.size ?? 0,
      byClub,
      byMimeType,
    };
  }),
});
