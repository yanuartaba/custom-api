/*
  Warnings:

  - A unique constraint covering the columns `[tiketId]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tiketId` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "tiketId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rooms_tiketId_key" ON "rooms"("tiketId");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_tiketId_fkey" FOREIGN KEY ("tiketId") REFERENCES "tikets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
