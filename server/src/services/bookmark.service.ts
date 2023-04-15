import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { ChapterErrorKey, PageErrorKey } from 'src/controllers/errorKeys';

@Injectable()
export class BookmarkService {
  constructor(private readonly db: DatabaseService) {}
  async getList(userId: number) {
    const bookmarks = await this.db.bookmark.findMany({
      where: { userId },
      select: {
        user: {
          select: { id: true, name: true },
        },
        title: {
          select: {
            id: true,
            name: true,
            imgUrl: true,
            Author: { select: { name: true } },
            type: true,
            status: true,
          },
        },
        page: { select: { number: true } },
        chapter: { select: { volume: true, number: true } },
      },
    });

    return bookmarks;
  }

  async upsert(
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
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

    const bookmark = await this.db.bookmark.upsert({
      where: {
        id: { userId, titleId },
      },
      create: {
        user: { connect: { id: userId } },
        title: { connect: { id: titleId } },
        chapter: { connect: { id: chapter.id } },
        page: { connect: { id: page.id } },
      },
      update: { chapterId: chapter.id, pageId: page.id },
      select: {
        title: {
          select: {
            id: true,
            name: true,
            imgUrl: true,
            Author: { select: { name: true } },
            chapters: { orderBy: { createdAt: 'desc' }, take: 1 },
          },
        },
        page: { select: { number: true } },
        chapter: { select: { volume: true, number: true } },
      },
    });

    return bookmark;
  }

  async deleteById(
    userId: number,
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
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

    const bookmark = await this.db.bookmark.findUnique({
      where: {
        id: { userId, titleId },
      },
    });

    if (!bookmark) throw new BusinessError('Bookmark not found!');

    await this.db.bookmark.delete({
      where: {
        id: { userId, titleId },
      },
    });

    return;
  }
}
