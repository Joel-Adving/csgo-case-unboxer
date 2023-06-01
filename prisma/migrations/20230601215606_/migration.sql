-- DropIndex
DROP INDEX "Skin_skinId_key";

-- AlterTable
ALTER TABLE "Skin" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "classid" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;
