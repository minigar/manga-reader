/*
  Warnings:

  - Added the required column `volume` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "volume" INTEGER NOT NULL;
