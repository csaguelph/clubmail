-- AlterTable
ALTER TABLE "PlatformSettings" ADD COLUMN     "enableRateLimiting" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxEmailsPerDay" INTEGER NOT NULL DEFAULT 50000,
ADD COLUMN     "maxEmailsPerMinute" INTEGER NOT NULL DEFAULT 14;
