/*
  Warnings:

  - You are about to alter the column `itemId` on the `Items` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "iconBase64" TEXT NOT NULL,
    "loadingBarBase64" TEXT
);
INSERT INTO "new_Items" ("iconBase64", "iconUrl", "id", "itemId", "loadingBarBase64", "name") SELECT "iconBase64", "iconUrl", "id", "itemId", "loadingBarBase64", "name" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
CREATE UNIQUE INDEX "Items_itemId_key" ON "Items"("itemId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
