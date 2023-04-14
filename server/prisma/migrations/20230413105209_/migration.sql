/*
  Warnings:

  - The primary key for the `PageCommentDislike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pageCommentId` on the `PageCommentDislike` table. All the data in the column will be lost.
  - The primary key for the `PageCommentLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pageCommentId` on the `PageCommentLike` table. All the data in the column will be lost.
  - The primary key for the `TitleCommentDislike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `titleCommentId` on the `TitleCommentDislike` table. All the data in the column will be lost.
  - The primary key for the `TitleCommentLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `titleCommentId` on the `TitleCommentLike` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `PageCommentDislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `PageCommentLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `TitleCommentDislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `TitleCommentLike` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "PageCommentDislike" DROP CONSTRAINT "PageCommentDislike_pkey",
DROP COLUMN "pageCommentId",
ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD CONSTRAINT "PageCommentDislike_pkey" PRIMARY KEY ("userId", "commentId");

-- AlterTable
ALTER TABLE "PageCommentLike" DROP CONSTRAINT "PageCommentLike_pkey",
DROP COLUMN "pageCommentId",
ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD CONSTRAINT "PageCommentLike_pkey" PRIMARY KEY ("userId", "commentId");

-- AlterTable
ALTER TABLE "TitleCommentDislike" DROP CONSTRAINT "TitleCommentDislike_pkey",
DROP COLUMN "titleCommentId",
ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD CONSTRAINT "TitleCommentDislike_pkey" PRIMARY KEY ("userId", "commentId");

-- AlterTable
ALTER TABLE "TitleCommentLike" DROP CONSTRAINT "TitleCommentLike_pkey",
DROP COLUMN "titleCommentId",
ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD CONSTRAINT "TitleCommentLike_pkey" PRIMARY KEY ("userId", "commentId");

-- AddForeignKey
ALTER TABLE "TitleCommentLike" ADD CONSTRAINT "TitleCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "TitleComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentDislike" ADD CONSTRAINT "TitleCommentDislike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "TitleComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentLike" ADD CONSTRAINT "PageCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PageComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentDislike" ADD CONSTRAINT "PageCommentDislike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PageComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
