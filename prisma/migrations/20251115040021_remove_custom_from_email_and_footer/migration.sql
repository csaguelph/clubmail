/*
  Warnings:

  - You are about to drop the column `footerText` on the `ClubSettings` table. All the data in the column will be lost.
  - You are about to drop the column `fromEmail` on the `ClubSettings` table. All the data in the column will be lost.
  - You are about to drop the column `physicalAddress` on the `ClubSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClubSettings" DROP COLUMN "footerText",
DROP COLUMN "fromEmail",
DROP COLUMN "physicalAddress";
