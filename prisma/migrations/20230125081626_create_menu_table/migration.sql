-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,
    "codeGroup" TEXT NOT NULL,
    "urlParam" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);
