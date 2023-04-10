/*
  Warnings:

  - You are about to drop the column `isAuthor` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Title" ADD COLUMN     "authorId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAuthor";

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
