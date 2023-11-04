/*
  Warnings:

  - You are about to drop the column `ItemId` on the `Items` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "iconBase64" TEXT NOT NULL,
    "loadingBarBase64" TEXT
);
INSERT INTO "new_Items" ("iconBase64", "iconUrl", "id", "loadingBarBase64", "name") SELECT "iconBase64", "iconUrl", "id", "loadingBarBase64", "name" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
CREATE UNIQUE INDEX "Items_itemId_key" ON "Items"("itemId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
