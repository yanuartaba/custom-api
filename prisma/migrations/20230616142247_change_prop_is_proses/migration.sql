/*
  Warnings:

  - The `isProses` column on the `riwayats` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "riwayats" DROP COLUMN "isProses",
ADD COLUMN     "isProses" INTEGER NOT NULL DEFAULT 1;
