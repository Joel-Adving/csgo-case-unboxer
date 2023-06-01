/*
  Warnings:

  - You are about to drop the column `marketable` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `souvenir` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `tournament` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `tradable` on the `Skin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "marketable",
DROP COLUMN "souvenir",
DROP COLUMN "tournament",
DROP COLUMN "tradable";
