/*
  Warnings:

  - You are about to drop the `Contains` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContainsRare` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contains" DROP CONSTRAINT "Contains_crate_id_fkey";

-- DropForeignKey
ALTER TABLE "Contains" DROP CONSTRAINT "Contains_skin_id_fkey";

-- DropForeignKey
ALTER TABLE "ContainsRare" DROP CONSTRAINT "ContainsRare_crate_id_fkey";

-- DropForeignKey
ALTER TABLE "ContainsRare" DROP CONSTRAINT "ContainsRare_skin_id_fkey";

-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "crateId" TEXT;

-- DropTable
DROP TABLE "Contains";

-- DropTable
DROP TABLE "ContainsRare";

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_crateId_fkey" FOREIGN KEY ("crateId") REFERENCES "Crate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
