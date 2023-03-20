-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAsset" BOOLEAN NOT NULL DEFAULT true,
    "isVideo" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT,
    "type" TEXT,
    "durasi" INTEGER,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
