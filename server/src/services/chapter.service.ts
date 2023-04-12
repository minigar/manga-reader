import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { Prisma } from '@prisma/client';
import { validName } from 'src/common/regex/chapter.regex';
import { ChapterErrorKey } from 'src/controllers/errorKeys';

@Injectable()
export class ChapterService {
  constructor(private readonly db: DatabaseService) {}

  async getList(titleId: number, sortOrder: Prisma.SortOrder) {
    const chapters = await this.db.chapter.findMany({
      where: { titleId },
      orderBy: [{ volume: sortOrder || 'asc' }, { number: 'asc' }],
    });

    return chapters;
  }

  async getById(titleId: number, number: number) {
    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    return chapter;
  }

  async create(titleId: number, name: string, number: number, volume: number) {
    await validName(name);

    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number },
    });

    if (chapter) throw new BusinessError('This Number already exists');

    const newChapter = await this.db.chapter.create({
      data: {
        name,
        number,
        volume,
        titleId,
      },
    });

    return newChapter;
  }

  async updateById(titleId: number, number: number, name: string) {
    await validName(name);

    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const updatedChapter = await this.db.chapter.update({
      where: { id: chapter.id },
      data: {
        name,
      },
    });

    return updatedChapter;
  }

  async delete(number: number, titleId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    await this.db.chapter.delete({ where: { id: chapter.id } });
    return;
  }
}
