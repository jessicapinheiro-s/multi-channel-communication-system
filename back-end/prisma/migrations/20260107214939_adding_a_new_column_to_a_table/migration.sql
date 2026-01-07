-- AlterTable
ALTER TABLE "Recipient" ADD COLUMN "name" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Warnings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Warnings" ("created_at", "id", "message", "status") SELECT "created_at", "id", "message", "status" FROM "Warnings";
DROP TABLE "Warnings";
ALTER TABLE "new_Warnings" RENAME TO "Warnings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
