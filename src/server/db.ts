import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";
import { deleteFromR2, isR2Configured } from "@/server/services/r2-storage";

const createPrismaClient = () => {
  const client = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Middleware to automatically delete R2 files when Media rows are deleted
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client as any).$use(async (params: any, next: any) => {
    // Only handle Media model delete operations
    if (params.model !== "Media") {
      return next(params);
    }

    // Handle delete (single record)
    if (params.action === "delete") {
      // Fetch the record first to get the R2 key
      const media = await client.media.findUnique({
        where: params.args.where,
        select: { key: true },
      });

      if (media?.key && isR2Configured()) {
        try {
          await deleteFromR2(media.key);
        } catch (error) {
          console.error(
            `Failed to delete R2 file ${media.key} for Media ${params.args.where.id}:`,
            error,
          );
          // Continue with database deletion even if R2 deletion fails
        }
      }
    }

    // Handle deleteMany (multiple records)
    if (params.action === "deleteMany") {
      // Fetch all records that will be deleted to get their R2 keys
      const mediaItems = await client.media.findMany({
        where: params.args.where,
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
    }

    // Proceed with the database operation
    return next(params);
  });

  return client;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
