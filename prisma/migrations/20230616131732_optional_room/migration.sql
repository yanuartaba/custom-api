-- DropForeignKey
ALTER TABLE "tikets" DROP CONSTRAINT "tikets_roomId_fkey";

-- AlterTable
ALTER TABLE "tikets" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
