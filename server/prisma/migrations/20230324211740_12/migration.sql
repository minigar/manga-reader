/*
  Warnings:

  - You are about to drop the column `time` on the `PageComment` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `TitleComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PageComment" DROP COLUMN "time";

-- AlterTable
ALTER TABLE "TitleComment" DROP COLUMN "time";
