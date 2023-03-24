/*
  Warnings:

  - A unique constraint covering the columns `[listId,titleId]` on the table `ListToTitle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ListToTitle_listId_titleId_key" ON "ListToTitle"("listId", "titleId");
