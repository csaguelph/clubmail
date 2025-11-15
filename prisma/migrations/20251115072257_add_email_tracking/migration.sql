/*
  Warnings:

  - You are about to drop the `EmailEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('QUEUED', 'SENT', 'DELIVERED', 'BOUNCED', 'COMPLAINED', 'FAILED');

-- DropForeignKey
ALTER TABLE "EmailEvent" DROP CONSTRAINT "EmailEvent_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "EmailEvent" DROP CONSTRAINT "EmailEvent_subscriberId_fkey";

-- DropTable
DROP TABLE "EmailEvent";

-- DropEnum
DROP TYPE "EmailEventStatus";

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "trackingToken" TEXT NOT NULL,
    "providerMessageId" TEXT,
    "status" "EmailStatus" NOT NULL DEFAULT 'QUEUED',
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campaignId" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailOpen" (
    "id" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailId" TEXT NOT NULL,

    CONSTRAINT "EmailOpen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailClick" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailId" TEXT NOT NULL,

    CONSTRAINT "EmailClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_trackingToken_key" ON "Email"("trackingToken");

-- CreateIndex
CREATE INDEX "Email_campaignId_idx" ON "Email"("campaignId");

-- CreateIndex
CREATE INDEX "Email_subscriberId_idx" ON "Email"("subscriberId");

-- CreateIndex
CREATE INDEX "Email_status_idx" ON "Email"("status");

-- CreateIndex
CREATE INDEX "Email_trackingToken_idx" ON "Email"("trackingToken");

-- CreateIndex
CREATE INDEX "EmailOpen_emailId_idx" ON "EmailOpen"("emailId");

-- CreateIndex
CREATE INDEX "EmailOpen_openedAt_idx" ON "EmailOpen"("openedAt");

-- CreateIndex
CREATE INDEX "EmailClick_emailId_idx" ON "EmailClick"("emailId");

-- CreateIndex
CREATE INDEX "EmailClick_clickedAt_idx" ON "EmailClick"("clickedAt");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailOpen" ADD CONSTRAINT "EmailOpen_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailClick" ADD CONSTRAINT "EmailClick_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;
