/*
  Warnings:

  - You are about to drop the `_ListToTitle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `listId` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ListToTitle" DROP CONSTRAINT "_ListToTitle_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToTitle" DROP CONSTRAINT "_ListToTitle_B_fkey";

-- AlterTable
ALTER TABLE "Title" ADD COLUMN     "listId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ListToTitle";

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
