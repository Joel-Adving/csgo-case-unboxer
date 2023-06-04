/*
  Warnings:

  - You are about to drop the column `skin_id` on the `Skin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "skin_id",
ADD COLUMN     "classid" TEXT;
