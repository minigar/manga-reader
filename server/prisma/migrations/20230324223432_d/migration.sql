/*
  Warnings:

  - You are about to drop the `ListToTitle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListToTitle" DROP CONSTRAINT "ListToTitle_listId_fkey";

-- DropForeignKey
ALTER TABLE "ListToTitle" DROP CONSTRAINT "ListToTitle_titleId_fkey";

-- DropTable
DROP TABLE "ListToTitle";

-- CreateTable
CREATE TABLE "_ListToTitle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ListToTitle_AB_unique" ON "_ListToTitle"("A", "B");

-- CreateIndex
CREATE INDEX "_ListToTitle_B_index" ON "_ListToTitle"("B");

-- AddForeignKey
ALTER TABLE "_ListToTitle" ADD CONSTRAINT "_ListToTitle_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToTitle" ADD CONSTRAINT "_ListToTitle_B_fkey" FOREIGN KEY ("B") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;
