-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_antrianId_fkey" FOREIGN KEY ("antrianId") REFERENCES "antrians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
