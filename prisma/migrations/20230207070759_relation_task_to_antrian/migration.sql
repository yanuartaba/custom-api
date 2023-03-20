/*
  Warnings:

  - A unique constraint covering the columns `[antrianId]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `antrianId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "antrianId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "tasks_antrianId_key" ON "tasks"("antrianId");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_antrianId_fkey" FOREIGN KEY ("antrianId") REFERENCES "antrians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
