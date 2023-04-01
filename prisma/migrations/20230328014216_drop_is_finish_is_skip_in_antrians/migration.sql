/*
  Warnings:

  - You are about to drop the column `isFinish` on the `antrians` table. All the data in the column will be lost.
  - You are about to drop the column `isSkip` on the `antrians` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "antrians" DROP COLUMN "isFinish",
DROP COLUMN "isSkip",
ADD COLUMN     "statusAntrian" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "nomor" SET DATA TYPE TEXT;
