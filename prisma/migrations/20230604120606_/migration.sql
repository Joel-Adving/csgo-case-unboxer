/*
  Warnings:

  - You are about to drop the column `crateId` on the `Skin` table. All the data in the column will be lost.
  - Made the column `name` on table `Crate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classid` on table `Skin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_crateId_fkey";

-- AlterTable
ALTER TABLE "Crate" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "crateId",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "classid" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CrateToSkin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CrateToSkin_AB_unique" ON "_CrateToSkin"("A", "B");

-- CreateIndex
CREATE INDEX "_CrateToSkin_B_index" ON "_CrateToSkin"("B");

-- AddForeignKey
ALTER TABLE "_CrateToSkin" ADD CONSTRAINT "_CrateToSkin_A_fkey" FOREIGN KEY ("A") REFERENCES "Crate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrateToSkin" ADD CONSTRAINT "_CrateToSkin_B_fkey" FOREIGN KEY ("B") REFERENCES "Skin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
