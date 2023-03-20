-- CreateEnum
CREATE TYPE "BannerType" AS ENUM ('VIDEO', 'IMAGE');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DEFAULT', 'REDMINE', 'SUNSHINE');

-- CreateTable
CREATE TABLE "Setting" (
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

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
