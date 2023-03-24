/*
  Warnings:

  - You are about to drop the column `listId` on the `Title` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_listId_fkey";

-- AlterTable
ALTER TABLE "Title" DROP COLUMN "listId";

-- CreateTable
CREATE TABLE "ListToTitle" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER,
    "titleId" INTEGER,

    CONSTRAINT "ListToTitle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListToTitle" ADD CONSTRAINT "ListToTitle_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListToTitle" ADD CONSTRAINT "ListToTitle_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE SET NULL ON UPDATE CASCADE;
