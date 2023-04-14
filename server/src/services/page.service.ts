import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import {
  ChapterErrorKey,
  PageErrorKey,
  TitleErrorKey,
} from 'src/controllers/errorKeys';

@Injectable()
export class PageService {
  constructor(private readonly db: DatabaseService) {}

  async getList(
    titleId: number,
    chapterNumber: number,
    page: number,
    perPage: number,
  ) {
    let skip: number;
    let take: number;

    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: chapterNumber, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    if (page && perPage) {
      take = Number(perPage);
      skip = (Number(page) - 1) * take;
    }

    const pages = await this.db.page.findMany({
      where: { chapterId: chapter.id },
      skip,
      take,
      orderBy: { number: 'asc' },
    });

    return pages;
  }

  async getById(titleId: number, chapterNumber: number, number: number) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: chapterNumber, titleId },
      select: { id: true, titleId: true },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    return page;
  }

  async create(
    titleId: number,
    chapterNumber: number,
    imgUri: string,
    number: number,
  ) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: chapterNumber, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { number, chapterId: chapter.id },
    });

    if (page) throw new BusinessError('This number already exist');

    return await this.db.page.create({
      data: {
        imgUri,
        number,
        chapterId: chapter.id,
      },
    });
  }

  async updateById(
    titleId: number,
    chapterNumber: number,
    number: number,
    imgUri: string,
  ) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: chapterNumber, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { number, chapterId: chapter.id },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const updatedPage = await this.db.page.update({
      where: { id: page.id },
      data: {
        imgUri,
      },
    });

    return updatedPage;
  }

  async delete(titleId: number, chapterNumber: number, number: number) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: chapterNumber, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({
      where: { number, chapterId: chapter.id },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    await this.db.page.delete({ where: { id: page.id } });
    return;
  }
}
