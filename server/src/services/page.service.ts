import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import {
  ChapterErrorKey,
  GeneralErrorKey,
  PageErrorKey,
} from 'src/controllers/errorKeys';

@Injectable()
export class PageService {
  constructor(private readonly db: DatabaseService) {}

  async getList(
    titleId: number,
    chapterId: number,
    page: number,
    perPage: number,
  ) {
    const chapter = await this.db.chapter.findFirst({
      where: { id: chapterId },
    });

    const isMatches = titleId === chapter.titleId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    const offset = (page - 1) * perPage;

    const pages = await this.db.page.findMany({
      where: { chapterId },
      skip: offset,
      take: perPage,
      orderBy: { number: 'asc' },
    });

    return pages;
  }

  async getById(titleId: number, chapterId: number, id: number) {
    const chapter = await this.db.chapter.findFirst({
      where: { id: chapterId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatches = titleId === chapter.titleId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    const page = await this.db.page.findFirst({ where: { id } });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    return page;
  }

  async create(
    titleId: number,
    chapterId: number,
    imgUri: string,
    number: number,
  ) {
    const chapter = await this.db.chapter.findFirst({
      where: { id: chapterId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatches = titleId === chapter.titleId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    const page = await this.db.page.create({
      data: {
        imgUri,
        number,
        chapterId,
      },
    });

    return page;
  }

  async updateById(
    titleId: number,
    chapterId: number,
    id: number,
    imgUri: string,
  ) {
    const chapter = await this.db.chapter.findFirst({
      where: { id: chapterId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatchesTitleId = titleId === chapter.titleId;

    if (!isMatchesTitleId)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Title Id');

    const page = await this.db.page.findFirst({ where: { id } });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isMatchesChapterId = page.chapterId === chapterId;

    if (!isMatchesChapterId)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Chapter Id');

    const updatedPage = await this.db.page.update({
      where: { id },
      data: {
        imgUri,
      },
    });

    return updatedPage;
  }

  async delete(titleId: number, chapterId: number, id: number) {
    const chapter = await this.db.chapter.findFirst({
      where: { id: chapterId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatchesTitleId = titleId === chapter.titleId;

    if (!isMatchesTitleId)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Title Id');

    const page = await this.db.page.findFirst({ where: { id } });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isMatches = page.chapterId === chapterId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);
    return;
  }
}
