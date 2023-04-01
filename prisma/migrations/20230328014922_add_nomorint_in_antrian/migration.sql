/*
  Warnings:

  - Added the required column `nomorInt` to the `antrians` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "antrians" ADD COLUMN     "nomorInt" INTEGER NOT NULL;
