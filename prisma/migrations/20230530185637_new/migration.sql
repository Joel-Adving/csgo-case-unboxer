/*
  Warnings:

  - Made the column `name` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `marketable` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tradable` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classid` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icon_url` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icon_url_large` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weapon_type` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gun_type` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exterior` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rarity` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rarity_color` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_sale_date` on table `Skin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "knife_type" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "marketable" SET NOT NULL,
ALTER COLUMN "tradable" SET NOT NULL,
ALTER COLUMN "classid" SET NOT NULL,
ALTER COLUMN "icon_url" SET NOT NULL,
ALTER COLUMN "icon_url_large" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "weapon_type" SET NOT NULL,
ALTER COLUMN "gun_type" SET NOT NULL,
ALTER COLUMN "exterior" SET NOT NULL,
ALTER COLUMN "rarity" SET NOT NULL,
ALTER COLUMN "rarity_color" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "first_sale_date" SET NOT NULL;
