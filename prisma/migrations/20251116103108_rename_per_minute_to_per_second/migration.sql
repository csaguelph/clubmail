/*
  Warnings:

  - You are about to drop the column `maxEmailsPerMinute` on the `PlatformSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlatformSettings" DROP COLUMN "maxEmailsPerMinute",
ADD COLUMN     "maxEmailsPerSecond" INTEGER NOT NULL DEFAULT 14;
