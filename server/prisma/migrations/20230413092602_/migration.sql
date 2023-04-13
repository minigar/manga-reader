/*
  Warnings:

  - You are about to drop the column `pageCommentId` on the `PageCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `pageCommentId` on the `PageCommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `titleCommentId` on the `TitleCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `titleCommentId` on the `TitleCommentLike` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `PageCommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PageCommentDislike" DROP CONSTRAINT "PageCommentDislike_pageCommentId_fkey";

-- DropForeignKey
ALTER TABLE "PageCommentLike" DROP CONSTRAINT "PageCommentLike_pageCommentId_fkey";

-- DropForeignKey
ALTER TABLE "TitleCommentDislike" DROP CONSTRAINT "TitleCommentDislike_titleCommentId_fkey";

-- DropForeignKey
ALTER TABLE "TitleCommentLike" DROP CONSTRAINT "TitleCommentLike_titleCommentId_fkey";

-- AlterTable
ALTER TABLE "PageCommentDislike" DROP COLUMN "pageCommentId",
ADD COLUMN     "commentId" INTEGER;

-- AlterTable
ALTER TABLE "PageCommentLike" DROP COLUMN "pageCommentId",
ADD COLUMN     "commentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TitleCommentDislike" DROP COLUMN "titleCommentId",
ADD COLUMN     "commentId" INTEGER;

-- AlterTable
ALTER TABLE "TitleCommentLike" DROP COLUMN "titleCommentId",
ADD COLUMN     "commentId" INTEGER;

-- AddForeignKey
ALTER TABLE "TitleCommentLike" ADD CONSTRAINT "TitleCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "TitleComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentDislike" ADD CONSTRAINT "TitleCommentDislike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "TitleComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentLike" ADD CONSTRAINT "PageCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PageComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentDislike" ADD CONSTRAINT "PageCommentDislike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PageComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
