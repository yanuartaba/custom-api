-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomName" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tikets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER NOT NULL,
    "isIdle" BOOLEAN NOT NULL DEFAULT true,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "tikets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batchs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batchs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
