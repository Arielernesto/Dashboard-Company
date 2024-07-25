-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL DEFAULT '0',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "profileImage" TEXT NOT NULL,
    "cif" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("cif", "country", "createdAt", "description", "id", "name", "phone", "profileImage", "updatedAt", "userId", "website") SELECT "cif", "country", "createdAt", "description", "id", "name", "phone", "profileImage", "updatedAt", "userId", "website" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
