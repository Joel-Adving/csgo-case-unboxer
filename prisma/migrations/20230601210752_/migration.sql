/*
  Warnings:

  - You are about to drop the column `icon_url` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `icon_url_large` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Skin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "icon_url",
DROP COLUMN "icon_url_large",
DROP COLUMN "price",
ADD COLUMN     "prices" JSONB;
