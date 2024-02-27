/*
  Warnings:

  - Added the required column `mainActor` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "mainActor" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "Movie_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("description", "director", "genreId", "id", "length", "title") SELECT "description", "director", "genreId", "id", "length", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
