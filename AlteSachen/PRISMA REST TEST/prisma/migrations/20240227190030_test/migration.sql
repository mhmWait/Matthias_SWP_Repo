/*
  Warnings:

  - You are about to drop the column `name` on the `Genre` table. All the data in the column will be lost.
  - Added the required column `GenreName` to the `Genre` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "GenreName" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,
    CONSTRAINT "Genre_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Genre" ("id", "songId") SELECT "id", "songId" FROM "Genre";
DROP TABLE "Genre";
ALTER TABLE "new_Genre" RENAME TO "Genre";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
