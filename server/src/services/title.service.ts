import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { TitleBodyModel, TitleUpdateBodyModel } from 'src/models/Title.dto';
import { GenreErrorKey } from 'src/controllers/errorKeys/GenreErrorKey';
import { TitleStatus, TitleType } from '@prisma/client';
import { validName } from 'src/common/regex/title.regex';

@Injectable()
export class TitleService {
  constructor(private readonly db: DatabaseService) {}
  async getList(
    page?: number,
    perPage?: number,
    sortBy?: string,
    sortOrder?: string,
    include?: number[],
    exclude?: number[],
    types?: TitleType[],
    status?: TitleStatus[],
    yearReleaseMin?: number,
    yearReleaseMax?: number,
  ) {
    let defaultExcludeGenre: { id: number };
    let parseYearReleaseMin: number;
    let parseYearReleaseMax: number;
    let parseExcludeMany: number[];
    let parseIncludeMany: number[];
    let skip: number;
    let take: number;

    const now = new Date();
    const currentYear = now.getFullYear();

    if (page && perPage) {
      take = Number(perPage);
      skip = (Number(page) - 1) * take;
    }

    const pagination = {
      skip,
      take,
      orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
      include: {
        genres: {
          select: {
            name: true,
          },
        },
        ratings: {
          select: {
            id: true,
            userId: true,
            value: true,
          },
        },
      },
    };

    if (!exclude) {
      defaultExcludeGenre = await this.defaultExcludeValue();
      exclude = [defaultExcludeGenre.id]; // give to exclude array default value if not exist
    }

    await this.validateGenresIds(exclude);

    if (exclude.length > 1)
      parseExcludeMany = exclude.map((str) => parseInt(str.toString(), 10));

    const parseExcludeOne = Number(exclude[0]);

    if (status) await this.validateStatus(status);

    if (types) await this.validateTypes(types);

    if (yearReleaseMin) parseYearReleaseMin = Number(yearReleaseMin);

    if (yearReleaseMax) parseYearReleaseMax = Number(yearReleaseMax);

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
          status: {
            in: status,
          },
          yearRelease: {
            gte: parseYearReleaseMin || 0,
            lte: parseYearReleaseMax || currentYear,
          },
        },

        skip: pagination.skip,
        take: pagination.take,
        orderBy: pagination.orderBy,
        include: pagination.include,
      });
    }

    await this.validateGenresIds(include);

    if (include.length > 1)
      parseIncludeMany = include.map((str) => parseInt(str.toString(), 10));

    const parseIncludeOne = Number(include[0]);

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
        status: {
          in: status,
        },
        yearRelease: {
          gte: parseYearReleaseMin || 0,
          lte: parseYearReleaseMax || currentYear,
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
    authorId,
  }: TitleBodyModel) {
    await validName(name);

    const title = await this.db.title.findFirst({ where: { name } });

    if (title) throw new BusinessError(TitleErrorKey.NAME_AREADY_EXIST);

    const newTitle = await this.db.title.create({
      data: { name, description, yearRelease, type, status, authorId },
    });

    return newTitle;
  }

  async updateById(
    id: number,
    { name, description, yearRelease, type, status }: TitleUpdateBodyModel,
  ) {
    await validName(name);

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

  async defaultExcludeValue(): Promise<{ id: number }> {
    const defaultExcludeGenre = await this.db.genre.findFirst({
      where: { name: 'default-exclude' },
      select: { id: true },
    });

    if (!defaultExcludeGenre) {
      return await this.db.genre.create({
        data: { name: 'default-exclude' },
        select: { id: true },
      });
    }

    return defaultExcludeGenre;
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
        throw new BusinessError(TitleErrorKey.TYPES_BAD_VALIDATION);
    }
  }

  async validateStatus(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      const currentElm = array[i];

      const isElmContainsType = this.isStatus(currentElm);

      if (!isElmContainsType)
        throw new BusinessError(TitleErrorKey.STATUS_BAD_VALIDATION);
    }
  }

  isStatus(value: string): value is TitleStatus {
    return Object.values(TitleStatus).includes(value as TitleStatus);
  }

  isType(value: string): value is TitleType {
    return Object.values(TitleType).includes(value as TitleType);
  }
}
