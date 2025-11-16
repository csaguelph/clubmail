-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "gryphlifeId" TEXT,
ADD COLUMN     "organizationEmail" TEXT;

-- CreateIndex
CREATE INDEX "Club_gryphlifeId_idx" ON "Club"("gryphlifeId");
