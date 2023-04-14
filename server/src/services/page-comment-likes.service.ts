import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import {
  ChapterErrorKey,
  CommentsErrorKey,
  LikeErrorKey,
  PageErrorKey,
} from 'src/controllers/errorKeys';

@Injectable()
export class PageCommentLikesService {
  constructor(private readonly db: DatabaseService) {}
  async getAmount(
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    commentId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const comment = await this.db.pageComment.findFirst({
      where: { id: commentId, pageId: page.id },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const amount = comment.likes.length - comment.dislikes.length;

    return amount;
  }

  async addLike(
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    commentId: number,
    userId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const comment = await this.db.pageComment.findFirst({
      where: { id: commentId, pageId: page.id },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const like = await this.db.pageCommentLike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (like) throw new BusinessError(LikeErrorKey.LIKE_ALREADY_EXIST);

    const dislike = await this.db.pageCommentDislike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (dislike) {
      await this.db.pageCommentDislike.delete({
        where: { id: { userId, commentId } },
      });
    }

    await this.db.pageCommentLike.create({
      data: {
        comment: {
          connect: { id: commentId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    const likes = await this.db.pageCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.pageCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.pageComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }

  async addDislike(
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    userId: number,
    commentId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const comment = await this.db.pageComment.findFirst({
      where: { id: commentId, pageId: page.id },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const dislike = await this.db.pageCommentDislike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (dislike) throw new BusinessError(LikeErrorKey.DISLIKE_AREADY_EXIST);

    const like = await this.db.pageCommentLike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (like) {
      await this.db.pageCommentLike.delete({
        where: { id: { userId, commentId } },
      });
    }

    await this.db.pageCommentDislike.create({
      data: {
        comment: {
          connect: { id: commentId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    const likes = await this.db.pageCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.pageCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.pageComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }

  async deleteLike(
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    userId: number,
    commentId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const comment = await this.db.pageComment.findFirst({
      where: { id: commentId, pageId: page.id },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const like = await this.db.pageCommentLike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (!like) throw new BusinessError(LikeErrorKey.LIKE_NOT_EXIST);

    await this.db.pageCommentLike.delete({
      where: { id: { userId, commentId } },
    });

    const likes = await this.db.pageCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.pageCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.pageComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }

  async deleteDislike(
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    userId: number,
    commentId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const comment = await this.db.pageComment.findFirst({
      where: { id: commentId, pageId: page.id },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const dislike = await this.db.pageCommentDislike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (!dislike) throw new BusinessError(LikeErrorKey.DISLIKE_NOT_EXIST);

    await this.db.pageCommentDislike.delete({
      where: { id: { userId, commentId } },
    });

    const likes = await this.db.pageCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.pageCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.pageComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }
}
