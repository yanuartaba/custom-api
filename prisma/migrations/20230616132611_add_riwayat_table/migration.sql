/*
  Warnings:

  - You are about to drop the column `roomId` on the `tikets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tikets" DROP CONSTRAINT "tikets_roomId_fkey";

-- AlterTable
ALTER TABLE "tikets" DROP COLUMN "roomId";

-- CreateTable
CREATE TABLE "riwayats" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER NOT NULL,
    "tiketId" INTEGER NOT NULL,

    CONSTRAINT "riwayats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "riwayats" ADD CONSTRAINT "riwayats_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riwayats" ADD CONSTRAINT "riwayats_tiketId_fkey" FOREIGN KEY ("tiketId") REFERENCES "tikets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
