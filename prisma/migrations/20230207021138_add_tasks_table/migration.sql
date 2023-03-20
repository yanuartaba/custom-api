-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tanggal" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "petugasId" INTEGER NOT NULL,
    "counterId" INTEGER NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_petugasId_fkey" FOREIGN KEY ("petugasId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "counters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_group_fkey" FOREIGN KEY ("group") REFERENCES "menus"("codeGroup") ON DELETE RESTRICT ON UPDATE CASCADE;
