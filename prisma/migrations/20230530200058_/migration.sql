/*
  Warnings:

  - A unique constraint covering the columns `[classid]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Skin_classid_key" ON "Skin"("classid");
