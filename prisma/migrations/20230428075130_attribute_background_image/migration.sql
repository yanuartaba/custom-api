-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "background_enable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "background_img" TEXT,
ALTER COLUMN "pin_code" SET DEFAULT '1234';
