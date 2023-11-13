-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
