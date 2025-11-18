-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_subscriberId_fkey";

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;
