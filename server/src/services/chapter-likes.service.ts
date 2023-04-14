import { Injectable } from '@nestjs/common';
import {
  ChapterErrorKey,
  LikeErrorKey,
  TitleErrorKey,
} from 'src/controllers/errorKeys';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';

@Injectable()
export class ChapterLikesService {
  constructor(private readonly db: DatabaseService) {}
  async getAmount(titleId: number, chapterNumber: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
      include: { likes: true },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    return chapter.likes.length;
  }

  async addLike(titleId: number, chapterNumber: number, userId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const like = await this.db.chapterLike.findUnique({
      where: { id: { userId, chapterId: chapter.id } },
    });

    if (like) throw new BusinessError(LikeErrorKey.LIKE_ALREADY_EXIST);

    await this.db.chapterLike.create({
      data: {
        chapter: {
          connect: { id: chapter.id },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    const likes = await this.db.chapterLike.findMany({
      where: { chapterId: chapter.id },
    });

    return await this.db.chapter.update({
      where: { id: chapter.id },
      data: { likeAmount: likes.length },
      include: { likes: true },
    });
  }

  async deleteLike(titleId: number, chapterNumber: number, userId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const like = await this.db.chapterLike.findUnique({
      where: { id: { userId, chapterId: chapter.id } },
    });

    if (!like) throw new BusinessError(LikeErrorKey.LIKE_NOT_EXIST);

    await this.db.chapterLike.delete({
      where: { id: { userId, chapterId: chapter.id } },
    });

    const likes = await this.db.chapterLike.findMany({
      where: { chapterId: chapter.id },
    });

    return await this.db.chapter.update({
      where: { id: chapter.id },
      data: { likeAmount: likes.length },
      include: { likes: true },
    });
  }
}
