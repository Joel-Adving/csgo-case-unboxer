-- CreateTable
CREATE TABLE "Skin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "marketable" INTEGER NOT NULL,
    "tradable" INTEGER NOT NULL,
    "classid" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,
    "icon_url_large" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "weapon_type" TEXT NOT NULL,
    "gun_type" TEXT NOT NULL,
    "exterior" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "rarity_color" TEXT NOT NULL,
    "price" JSONB NOT NULL,
    "first_sale_date" TEXT NOT NULL,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("id")
);
