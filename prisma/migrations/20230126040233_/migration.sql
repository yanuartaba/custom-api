/*
  Warnings:

  - A unique constraint covering the columns `[codeGroup]` on the table `menus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "counters" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nomorCounter" TEXT NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menus_codeGroup_key" ON "menus"("codeGroup");

-- AddForeignKey
ALTER TABLE "counters" ADD CONSTRAINT "counters_group_fkey" FOREIGN KEY ("group") REFERENCES "menus"("codeGroup") ON DELETE RESTRICT ON UPDATE CASCADE;
