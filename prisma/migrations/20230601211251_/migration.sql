/*
  Warnings:

  - A unique constraint covering the columns `[skinId]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "image" TEXT,
ADD COLUMN     "max_float" DOUBLE PRECISION,
ADD COLUMN     "min_float" DOUBLE PRECISION,
ADD COLUMN     "skinId" TEXT,
ADD COLUMN     "stattrak" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "Skin_skinId_key" ON "Skin"("skinId");
