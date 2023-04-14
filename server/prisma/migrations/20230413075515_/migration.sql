/*
  Warnings:

  - The values [AUTHOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `authorId` on table `Title` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_authorId_fkey";

-- AlterTable
ALTER TABLE "PageComment" ADD COLUMN     "likeAmount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Title" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TitleComment" ADD COLUMN     "likeAmount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "TitleCommentLike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "titleCommentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TitleCommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleCommentDislike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "titleCommentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TitleCommentDislike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterLike" (
    "id" SERIAL NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChapterLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageCommentLike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pageCommentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageCommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageCommentDislike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pageCommentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageCommentDislike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentLike" ADD CONSTRAINT "TitleCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentLike" ADD CONSTRAINT "TitleCommentLike_titleCommentId_fkey" FOREIGN KEY ("titleCommentId") REFERENCES "TitleComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentDislike" ADD CONSTRAINT "TitleCommentDislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCommentDislike" ADD CONSTRAINT "TitleCommentDislike_titleCommentId_fkey" FOREIGN KEY ("titleCommentId") REFERENCES "TitleComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterLike" ADD CONSTRAINT "ChapterLike_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterLike" ADD CONSTRAINT "ChapterLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentLike" ADD CONSTRAINT "PageCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentLike" ADD CONSTRAINT "PageCommentLike_pageCommentId_fkey" FOREIGN KEY ("pageCommentId") REFERENCES "PageComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentDislike" ADD CONSTRAINT "PageCommentDislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCommentDislike" ADD CONSTRAINT "PageCommentDislike_pageCommentId_fkey" FOREIGN KEY ("pageCommentId") REFERENCES "PageComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
