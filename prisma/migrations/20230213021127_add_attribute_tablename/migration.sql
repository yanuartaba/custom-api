/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "Setting";

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

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "banner_type" "BannerType" NOT NULL DEFAULT 'VIDEO',
    "durasi_transition" INTEGER NOT NULL DEFAULT 5,
    "file_banner" JSONB,
    "logo_header" TEXT,
    "text_header" TEXT,
    "theme" "Theme" NOT NULL DEFAULT 'DEFAULT',
    "grid" INTEGER NOT NULL DEFAULT 4,
    "running_text_active" BOOLEAN NOT NULL DEFAULT true,
    "running_text" TEXT,
    "logo_print" TEXT,
    "text_print" TEXT,
    "fontsize_print" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);
