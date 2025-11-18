import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";
import { deleteFromR2, isR2Configured } from "@/server/services/r2-storage";

const createPrismaClient = () => {
  const baseClient = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Extend Prisma Client to automatically delete R2 files when Media rows are deleted
  const client = baseClient.$extends({
    query: {
      club: {
        async delete({ args, query }) {
          // Before deleting the club, fetch and delete all associated media from R2
          // This is necessary because cascade deletes happen at the database level
          // and won't trigger our media.delete extension
          const clubId = "id" in args.where ? args.where.id : undefined;

          if (!clubId) {
            return query(args);
          }

          const mediaItems = await baseClient.media.findMany({
            where: { clubId },
            select: { key: true },
          });

          if (mediaItems.length > 0 && isR2Configured()) {
            // Delete all R2 files in parallel
            const deletePromises = mediaItems
              .filter((item) => item.key)
              .map((item) =>
                deleteFromR2(item.key).catch((error) => {
                  console.error(`Failed to delete R2 file ${item.key}:`, error);
                }),
              );

            await Promise.all(deletePromises);
          }

          // Proceed with the club deletion (which will cascade delete media records)
          return query(args);
        },
      },
      media: {
        async delete({ args, query }) {
          // Fetch the record first to get the R2 key
          const media = await baseClient.media.findUnique({
            where: args.where,
            select: { key: true },
          });

          if (media?.key && isR2Configured()) {
            try {
              await deleteFromR2(media.key);
            } catch (error) {
              console.error(
                `Failed to delete R2 file ${media.key} from R2 storage:`,
                error,
              );
              // Continue with database deletion even if R2 deletion fails
            }
          }

          // Proceed with the database deletion
          return query(args);
        },
        async deleteMany({ args, query }) {
          // Fetch all records that will be deleted to get their R2 keys
          const mediaItems = await baseClient.media.findMany({
            where: args.where,
            select: { key: true },
          });

          if (mediaItems.length > 0 && isR2Configured()) {
            // Delete all R2 files in parallel
            const deletePromises = mediaItems
              .filter((item) => item.key)
              .map((item) =>
                deleteFromR2(item.key).catch((error) => {
                  console.error(`Failed to delete R2 file ${item.key}:`, error);
                }),
              );

            await Promise.all(deletePromises);
          }

          // Proceed with the database deletion
          return query(args);
        },
      },
    },
  });

  return client;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
