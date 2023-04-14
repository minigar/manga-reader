import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { CommentsErrorKey, LikeErrorKey } from 'src/controllers/errorKeys';

@Injectable()
export class TitleCommentLikesService {
  constructor(private readonly db: DatabaseService) {}
  async getAmount(titleId: number, commentId: number) {
    const title = await this.db.title.findFirst({
      where: { id: titleId },
    });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const comment = await this.db.titleComment.findFirst({
      where: { id: commentId, titleId },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const amount = comment.likes.length - comment.dislikes.length;

    return amount;
  }

  async addLike(titleId: number, userId: number, commentId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const comment = await this.db.titleComment.findFirst({
      where: { titleId, id: commentId },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const like = await this.db.titleCommentLike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (like) throw new BusinessError(LikeErrorKey.LIKE_ALREADY_EXIST);

    const dislike = await this.db.titleCommentDislike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (dislike) {
      await this.db.titleCommentDislike.delete({
        where: { id: { userId, commentId } },
      });
    }

    await this.db.titleCommentLike.create({
      data: {
        comment: {
          connect: { id: commentId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    const likes = await this.db.titleCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.titleCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.titleComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }

  async addDislike(titleId: number, userId: number, commentId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const comment = await this.db.titleComment.findFirst({
      where: { titleId, id: commentId },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const dislike = await this.db.titleCommentDislike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (dislike) throw new BusinessError(LikeErrorKey.DISLIKE_AREADY_EXIST);

    const like = await this.db.titleCommentLike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (like) {
      await this.db.titleCommentLike.delete({
        where: { id: { userId, commentId } },
      });
    }

    await this.db.titleCommentDislike.create({
      data: {
        comment: {
          connect: { id: commentId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    const likes = await this.db.titleCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.titleCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.titleComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }

  async deleteLike(titleId: number, userId: number, commentId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const comment = await this.db.titleComment.findFirst({
      where: { titleId, id: commentId },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const like = await this.db.titleCommentLike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (!like) throw new BusinessError(LikeErrorKey.LIKE_NOT_EXIST);

    await this.db.titleCommentLike.delete({
      where: { id: { userId, commentId } },
    });

    const likes = await this.db.titleCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.titleCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.titleComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }

  async deleteDislike(titleId: number, userId: number, commentId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const comment = await this.db.titleComment.findFirst({
      where: { titleId, id: commentId },
      include: { likes: true, dislikes: true },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const dislike = await this.db.titleCommentDislike.findUnique({
      where: { id: { userId, commentId } },
    });

    if (!dislike) throw new BusinessError(LikeErrorKey.DISLIKE_NOT_EXIST);

    await this.db.titleCommentDislike.delete({
      where: { id: { userId, commentId } },
    });

    const likes = await this.db.titleCommentLike.findMany({
      where: { commentId },
    });

    const dislikes = await this.db.titleCommentDislike.findMany({
      where: { commentId },
    });

    const amount = likes.length + -dislikes.length;

    return await this.db.titleComment.update({
      where: { id: comment.id },
      data: { likeAmount: amount },
      include: { likes: true, dislikes: true },
    });
  }
}
