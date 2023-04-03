import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { TitleBodyModel } from 'src/models/Title.dto';

@Injectable()
export class TitleService {
  constructor(private readonly db: DatabaseService) {}
  async getList(
    page: number,
    perPage: number,
    sortBy: string,
    sortOrder: string,
    genreIdOrArray: number[],
  ) {
    const offset = (page - 1) * perPage;
    const pagination = {
      skip: offset,
      take: perPage,
      orderBy: { [sortBy || 'name']: sortOrder || 'asc' },
      include: {
        genres: {
          select: {
            name: true,
          },
        },
      },
    };

    if (!genreIdOrArray) {
      return await this.db.title.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: pagination.orderBy,
        include: pagination.include,
      });
    }

    let parsedGenreIds = [Number(genreIdOrArray)];

    if (genreIdOrArray.length > 1) {
      parsedGenreIds = genreIdOrArray.map(Number);
    }

    return await this.db.title.findMany({
      where: {
        genres: {
          some: {
            id: {
              in: parsedGenreIds,
            },
          },
        },
      },

      skip: pagination.skip,
      take: pagination.take,
      orderBy: pagination.orderBy,
      include: pagination.include,
    });
  }

  async getById(id: number) {
    const title = await this.db.title.findFirst({ where: { id } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    return title;
  }

  async create({
    name,
    description,
    yearRelease,
    type,
    status,
  }: TitleBodyModel) {
    const title = await this.db.title.findFirst({ where: { name } });

    if (title) throw new BusinessError(TitleErrorKey.NAME_AREADY_EXIST);

    const newTitle = await this.db.title.create({
      data: { name, description, yearRelease, type, status },
    });

    return newTitle;
  }

  async updateById(
    id: number,
    { name, description, yearRelease, type, status }: TitleBodyModel,
  ) {
    const title = await this.db.title.findFirst({ where: { id } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const updateTitle = await this.db.title.update({
      where: { id },
      data: {
        name,
        description,
        yearRelease,
        type,
        status,
      },
    });
    return updateTitle;
  }

  async deleteById(id: number) {
    const title = await this.db.title.findFirst({ where: { id } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    await this.db.title.delete({ where: { id } });

    return;
  }
}
