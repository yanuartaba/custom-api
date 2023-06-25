/*
  Warnings:

  - Added the required column `nomor` to the `tikets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tikets" ADD COLUMN     "nomor" INTEGER NOT NULL;
