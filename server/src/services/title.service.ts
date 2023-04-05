import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { TitleBodyModel } from 'src/models/Title.dto';
import { GenreErrorKey } from 'src/controllers/errorKeys/GenreErrorKey';
import { TitleType } from '@prisma/client';

@Injectable()
export class TitleService {
  constructor(private readonly db: DatabaseService) {}
  async getList(
    page: number,
    perPage: number,
    sortBy: string,
    sortOrder: string,
    include?: number[],
    exclude?: number[],
    types?: TitleType[],
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

    if (types) {
      await this.validateTypes(types);
      console.log('valid');
    }

    const defaultExcludeGenre = await this.db.genre.findFirst({
      where: { name: 'default-exclude' },
      select: { id: true },
    });

    if (!exclude) exclude = [defaultExcludeGenre.id];

    const parseExcludeOne = Number(exclude[0]);

    let parseExcludeMany: number[];

    if (exclude.length > 1)
      parseExcludeMany = exclude.map((str) => parseInt(str.toString(), 10));

    if (!include) {
      return await this.db.title.findMany({
        where: {
          genres: {
            none: {
              id: {
                in: parseExcludeMany || parseExcludeOne,
              },
            },
          },
          type: {
            in: types,
          },
        },

        skip: pagination.skip,
        take: pagination.take,
        orderBy: pagination.orderBy,
        include: pagination.include,
      });
    }

    await this.validateGenresIds(include);
    await this.validateGenresIds(exclude);

    const parseIncludeOne = Number(include[0]);

    let parseIncludeMany: number[];

    if (include.length > 1)
      parseIncludeMany = include.map((str) => parseInt(str.toString(), 10));

    return await this.db.title.findMany({
      where: {
        genres: {
          some: {
            id: {
              in: parseIncludeMany || parseIncludeOne,
            },
          },
          none: {
            id: {
              in: parseExcludeMany || parseExcludeOne,
            },
          },
        },
        type: {
          in: types,
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

  async validateGenresIds(arrayOfIds: number[]) {
    for (let i = 0; i < arrayOfIds.length; i++) {
      const currentElm = Number(arrayOfIds[i]);

      if (Number.isNaN(currentElm))
        throw new BusinessError('Array of genre ids query all must me number');

      const genre = await this.db.genre.findFirst({
        where: { id: currentElm },
      });

      if (!genre)
        throw new BusinessError(
          GenreErrorKey.GENRE_NOT_EXSITS + ` id: ${currentElm}`,
        );
    }
  }

  async validateTypes(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      const currentElm = array[i];

      const isElmContainsType = this.isType(currentElm);

      if (!isElmContainsType)
        throw new BusinessError('Array of type must be only as titles types!');
    }
  }

  isType(value: string): value is TitleType {
    return Object.values(TitleType).includes(value as TitleType);
  }
}
