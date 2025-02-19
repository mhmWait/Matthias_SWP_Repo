/*
  Warnings:

  - You are about to drop the column `movieId` on the `Watchlist` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_MovieToWatchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MovieToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MovieToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Watchlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Watchlist" ("id", "userId") SELECT "id", "userId" FROM "Watchlist";
DROP TABLE "Watchlist";
ALTER TABLE "new_Watchlist" RENAME TO "Watchlist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToWatchlist_AB_unique" ON "_MovieToWatchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToWatchlist_B_index" ON "_MovieToWatchlist"("B");
