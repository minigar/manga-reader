/*
  Warnings:

  - The `type` column on the `Title` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TitleType" AS ENUM ('MANGA', 'MANHWA', 'MAMHUA', 'COMICS');

-- CreateEnum
CREATE TYPE "TitleStatus" AS ENUM ('ANNOUNCEMENT', 'ONGOING', 'FINISHED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Title" ADD COLUMN     "status" "TitleStatus" NOT NULL DEFAULT 'ANNOUNCEMENT',
ADD COLUMN     "yearRelease" INTEGER NOT NULL DEFAULT 1990,
DROP COLUMN "type",
ADD COLUMN     "type" "TitleType" NOT NULL DEFAULT 'MANGA';
