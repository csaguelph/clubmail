-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "qstashMessageId" TEXT,
ADD COLUMN     "scheduledFor" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Campaign_scheduledFor_idx" ON "Campaign"("scheduledFor");
