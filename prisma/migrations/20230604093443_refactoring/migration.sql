/*
  Warnings:

  - The primary key for the `Skin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classid` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `skinId` on the `Skin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Skin_classid_key";

-- AlterTable
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_pkey",
DROP COLUMN "classid",
DROP COLUMN "skinId",
ADD COLUMN     "skin_id" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Skin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Skin_id_seq";

-- CreateTable
CREATE TABLE "Crate" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "first_sale_date" TEXT,
    "image" TEXT,

    CONSTRAINT "Crate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contains" (
    "id" SERIAL NOT NULL,
    "skin_id" TEXT NOT NULL,
    "crate_id" TEXT NOT NULL,

    CONSTRAINT "Contains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContainsRare" (
    "id" SERIAL NOT NULL,
    "skin_id" TEXT NOT NULL,
    "crate_id" TEXT NOT NULL,

    CONSTRAINT "ContainsRare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Crate_id_key" ON "Crate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Crate_name_key" ON "Crate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skin_id_key" ON "Skin"("id");

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_crate_id_fkey" FOREIGN KEY ("crate_id") REFERENCES "Crate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainsRare" ADD CONSTRAINT "ContainsRare_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainsRare" ADD CONSTRAINT "ContainsRare_crate_id_fkey" FOREIGN KEY ("crate_id") REFERENCES "Crate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
