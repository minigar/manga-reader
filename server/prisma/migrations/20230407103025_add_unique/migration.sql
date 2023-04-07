/*
  Warnings:

  - A unique constraint covering the columns `[titleId,userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Title" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_titleId_userId_key" ON "Rating"("titleId", "userId");
