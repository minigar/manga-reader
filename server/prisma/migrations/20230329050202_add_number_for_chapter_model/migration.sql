/*
  Warnings:

  - Added the required column `number` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "number" INTEGER NOT NULL;
