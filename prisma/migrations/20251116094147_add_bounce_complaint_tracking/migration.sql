-- CreateEnum
CREATE TYPE "BounceType" AS ENUM ('SOFT', 'HARD');

-- AlterEnum
ALTER TYPE "SubscriberStatus" ADD VALUE 'BLOCKED';

-- CreateTable
CREATE TABLE "PlatformSettings" (
    "id" TEXT NOT NULL DEFAULT 'platform_settings',
    "softBounceThreshold" INTEGER NOT NULL DEFAULT 2,
    "hardBounceAction" TEXT NOT NULL DEFAULT 'BLOCK',
    "complaintThreshold" INTEGER NOT NULL DEFAULT 1,
    "complaintAction" TEXT NOT NULL DEFAULT 'UNSUBSCRIBE',
    "enableAutoCleanup" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlatformSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BounceEvent" (
    "id" TEXT NOT NULL,
    "bounceType" "BounceType" NOT NULL,
    "bounceSubType" TEXT,
    "diagnosticCode" TEXT,
    "providerMessageId" TEXT,
    "feedbackId" TEXT,
    "reportingMTA" TEXT,
    "action" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriberId" TEXT,
    "emailId" TEXT,

    CONSTRAINT "BounceEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplaintEvent" (
    "id" TEXT NOT NULL,
    "complaintFeedbackType" TEXT,
    "userAgent" TEXT,
    "providerMessageId" TEXT,
    "feedbackId" TEXT,
    "arrivalDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriberId" TEXT,
    "emailId" TEXT,

    CONSTRAINT "ComplaintEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SNSWebhookLog" (
    "id" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SNSWebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BounceEvent_subscriberId_idx" ON "BounceEvent"("subscriberId");

-- CreateIndex
CREATE INDEX "BounceEvent_emailId_idx" ON "BounceEvent"("emailId");

-- CreateIndex
CREATE INDEX "BounceEvent_createdAt_idx" ON "BounceEvent"("createdAt");

-- CreateIndex
CREATE INDEX "ComplaintEvent_subscriberId_idx" ON "ComplaintEvent"("subscriberId");

-- CreateIndex
CREATE INDEX "ComplaintEvent_emailId_idx" ON "ComplaintEvent"("emailId");

-- CreateIndex
CREATE INDEX "ComplaintEvent_createdAt_idx" ON "ComplaintEvent"("createdAt");

-- CreateIndex
CREATE INDEX "SNSWebhookLog_messageType_idx" ON "SNSWebhookLog"("messageType");

-- CreateIndex
CREATE INDEX "SNSWebhookLog_processed_idx" ON "SNSWebhookLog"("processed");

-- CreateIndex
CREATE INDEX "SNSWebhookLog_createdAt_idx" ON "SNSWebhookLog"("createdAt");

-- AddForeignKey
ALTER TABLE "BounceEvent" ADD CONSTRAINT "BounceEvent_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BounceEvent" ADD CONSTRAINT "BounceEvent_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintEvent" ADD CONSTRAINT "ComplaintEvent_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintEvent" ADD CONSTRAINT "ComplaintEvent_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE SET NULL ON UPDATE CASCADE;
