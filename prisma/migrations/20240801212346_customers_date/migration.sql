/*
  Warnings:

  - Added the required column `expire` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "expire" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT '0'
);
INSERT INTO "new_Customer" ("amount", "email", "id", "name", "status") SELECT "amount", "email", "id", "name", "status" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
