import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import {
  ChapterErrorKey,
  GeneralErrorKey,
  PageErrorKey,
  TitleErrorKey,
} from 'src/controllers/errorKeys';

@Injectable()
export class PageService {
  constructor(private readonly db: DatabaseService) {}

  async getList(titleId: number, c: number, page: number, perPage: number) {
    let skip: number;
    let take: number;

    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: c, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatches = titleId === chapter.titleId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

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

  async getById(titleId: number, c: number, number: number) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: c, titleId },
      select: { id: true, titleId: true },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatches = title.id === chapter.titleId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    return page;
  }

  async create(titleId: number, c: number, imgUri: string, number: number) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: c, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatches = titleId === chapter.titleId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

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

  async updateById(titleId: number, c: number, number: number, imgUri: string) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: c, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatchesTitleId = titleId === chapter.titleId;

    if (!isMatchesTitleId)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Title Id');

    const page = await this.db.page.findFirst({
      where: { number, chapterId: chapter.id },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isMatches = page.chapterId === chapter.id;

    if (!isMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Chapter Id');

    const updatedPage = await this.db.page.update({
      where: { id: page.id },
      data: {
        imgUri,
      },
    });

    return updatedPage;
  }

  async delete(titleId: number, c: number, number: number) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: c, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatchesTitleId = titleId === chapter.titleId;

    if (!isMatchesTitleId)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Title Id');

    const page = await this.db.page.findFirst({
      where: { number, chapterId: chapter.id },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isMatches = page.chapterId === chapter.id;

    if (!isMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Chapter Id');

    await this.db.page.delete({ where: { id: page.id } });
    return;
  }
}
