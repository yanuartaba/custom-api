/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Media";

-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAsset" BOOLEAN NOT NULL DEFAULT true,
    "isVideo" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT,
    "type" TEXT,
    "durasi" INTEGER,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);
