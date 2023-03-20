-- CreateTable
CREATE TABLE "antrians" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nomor" INTEGER NOT NULL,
    "isFinish" BOOLEAN NOT NULL DEFAULT false,
    "group" TEXT NOT NULL,

    CONSTRAINT "antrians_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "antrians" ADD CONSTRAINT "antrians_group_fkey" FOREIGN KEY ("group") REFERENCES "menus"("codeGroup") ON DELETE RESTRICT ON UPDATE CASCADE;
