/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Skin" ALTER COLUMN "marketable" DROP NOT NULL,
ALTER COLUMN "tradable" DROP NOT NULL,
ALTER COLUMN "icon_url" DROP NOT NULL,
ALTER COLUMN "icon_url_large" DROP NOT NULL,
ALTER COLUMN "weapon_type" DROP NOT NULL,
ALTER COLUMN "rarity" DROP NOT NULL,
ALTER COLUMN "rarity_color" DROP NOT NULL,
ALTER COLUMN "first_sale_date" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Skin_name_key" ON "Skin"("name");
