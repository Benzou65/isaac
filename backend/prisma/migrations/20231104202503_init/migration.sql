-- CreateTable
CREATE TABLE "Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ItemsId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "iconBase64" TEXT NOT NULL,
    "loadingBarBase64" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_ItemsId_key" ON "Items"("ItemsId");
