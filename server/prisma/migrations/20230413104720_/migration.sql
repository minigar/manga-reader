/*
  Warnings:

  - The primary key for the `ChapterLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ChapterLike` table. All the data in the column will be lost.
  - The primary key for the `PageCommentDislike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commentId` on the `PageCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PageCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `PageCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PageCommentDislike` table. All the data in the column will be lost.
  - The primary key for the `PageCommentLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commentId` on the `PageCommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PageCommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `PageCommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PageCommentLike` table. All the data in the column will be lost.
  - The primary key for the `TitleCommentDislike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commentId` on the `TitleCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TitleCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `TitleCommentDislike` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TitleCommentDislike` table. All the data in the column will be lost.
  - The primary key for the `TitleCommentLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commentId` on the `TitleCommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TitleCommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `TitleCommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TitleCommentLike` table. All the data in the column will be lost.
  - Added the required column `pageCommentId` to the `PageCommentDislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageCommentId` to the `PageCommentLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleCommentId` to the `TitleCommentDislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleCommentId` to the `TitleCommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChapterLike" DROP CONSTRAINT "ChapterLike_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "ChapterLike" DROP CONSTRAINT "ChapterLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "PageCommentDislike" DROP CONSTRAINT "PageCommentDislike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "PageCommentDislike" DROP CONSTRAINT "PageCommentDislike_userId_fkey";

-- DropForeignKey
ALTER TABLE "PageCommentLike" DROP CONSTRAINT "PageCommentLike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "PageCommentLike" DROP CONSTRAINT "PageCommentLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_titleId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TitleCommentDislike" DROP CONSTRAINT "TitleCommentDislike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "TitleCommentDislike" DROP CONSTRAINT "TitleCommentDislike_userId_fkey";

-- DropForeignKey
ALTER TABLE "TitleCommentLike" DROP CONSTRAINT "TitleCommentLike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "TitleCommentLike" DROP CONSTRAINT "TitleCommentLike_userId_fkey";

-- AlterTable
ALTER TABLE "ChapterLike" DROP CONSTRAINT "ChapterLike_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ChapterLike_pkey" PRIMARY KEY ("chapterId", "userId");

-- AlterTable
ALTER TABLE "PageCommentDislike" DROP CONSTRAINT "PageCommentDislike_pkey",
DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "pageCommentId" INTEGER NOT NULL,
ADD CONSTRAINT "PageCommentDislike_pkey" PRIMARY KEY ("userId", "pageCommentId");

-- AlterTable
ALTER TABLE "PageCommentLike" DROP CONSTRAINT "PageCommentLike_pkey",
DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "pageCommentId" INTEGER NOT NULL,
ADD CONSTRAINT "PageCommentLike_pkey" PRIMARY KEY ("userId", "pageCommentId");

-- AlterTable
ALTER TABLE "TitleCommentDislike" DROP CONSTRAINT "TitleCommentDislike_pkey",
DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "titleCommentId" INTEGER NOT NULL,
ADD CONSTRAINT "TitleCommentDislike_pkey" PRIMARY KEY ("userId", "titleCommentId");

-- AlterTable
ALTER TABLE "TitleCommentLike" DROP CONSTRAINT "TitleCommentLike_pkey",
DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "titleCommentId" INTEGER NOT NULL,
ADD CONSTRAINT "TitleCommentLike_pkey" PRIMARY KEY ("userId", "titleCommentId");

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentLike" ADD CONSTRAINT "TitleCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentLike" ADD CONSTRAINT "TitleCommentLike_titleCommentId_fkey" FOREIGN KEY ("titleCommentId") REFERENCES "TitleComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentDislike" ADD CONSTRAINT "TitleCommentDislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentDislike" ADD CONSTRAINT "TitleCommentDislike_titleCommentId_fkey" FOREIGN KEY ("titleCommentId") REFERENCES "TitleComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterLike" ADD CONSTRAINT "ChapterLike_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterLike" ADD CONSTRAINT "ChapterLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentLike" ADD CONSTRAINT "PageCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentLike" ADD CONSTRAINT "PageCommentLike_pageCommentId_fkey" FOREIGN KEY ("pageCommentId") REFERENCES "PageComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentDislike" ADD CONSTRAINT "PageCommentDislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentDislike" ADD CONSTRAINT "PageCommentDislike_pageCommentId_fkey" FOREIGN KEY ("pageCommentId") REFERENCES "PageComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
