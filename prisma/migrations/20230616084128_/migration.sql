/*
  Warnings:

  - You are about to drop the column `waktu` on the `batchs` table. All the data in the column will be lost.
  - Added the required column `waktuMulai` to the `batchs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktuSelesai` to the `batchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "batchs" DROP COLUMN "waktu",
ADD COLUMN     "waktuMulai" TIME NOT NULL,
ADD COLUMN     "waktuSelesai" TIME NOT NULL;
