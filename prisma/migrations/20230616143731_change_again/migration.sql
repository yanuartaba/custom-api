/*
  Warnings:

  - You are about to drop the column `tiketId` on the `rooms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_tiketId_fkey";

-- DropIndex
DROP INDEX "rooms_tiketId_key";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "tiketId";

-- AlterTable
ALTER TABLE "tikets" ADD COLUMN     "roomId" INTEGER;

-- AddForeignKey
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
