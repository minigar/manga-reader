import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { TitleErrorKey } from 'src/controllers/errorKeys';
import { GenreErrorKey } from '../controllers/errorKeys/GenreErrorKey';
import { validName } from 'src/common/regex/genre.regex';

@Injectable()
export class GenreService {
  constructor(private readonly db: DatabaseService) {}
  async getList() {
    const genres = await this.db.genre.findMany({
      include: { titles: { select: { name: true } } },
    });

    return genres;
  }

  async getById(id: number) {
    const genre = await this.db.genre.findFirst({
      where: { id },
      include: {
        titles: {
          orderBy: {}, //TODO
          select: { name: true },
        },
      },
    });

    if (!genre) throw new BusinessError(GenreErrorKey.GENRE_NOT_EXSITS);

    return genre;
  }

  async create(name: string, description: string) {
    await validName(name);

    const genre = await this.db.genre.findFirst({
      where: {
        name,
      },
    });

    if (genre) throw new BusinessError(GenreErrorKey.THIS_NAME_ALREADY_EXIST);

    const newGenre = await this.db.genre.create({
      data: {
        name,
        description,
      },
    });

    return newGenre;
  }

  async updateById(id: number, name: string, description: string) {
    await validName(name);

    const genre = await this.db.genre.findFirst({ where: { id } });

    if (!genre) throw new BusinessError(GenreErrorKey.GENRE_NOT_EXSITS);

    return await this.db.genre.update({
      where: { id },
      data: { name, description },
    });
  }

  async deleteById(id: number) {
    const genre = await this.db.genre.delete({ where: { id } });

    if (!genre) throw new BusinessError(GenreErrorKey.GENRE_NOT_EXSITS);

    await this.db.genre.delete({ where: { id } });

    return;
  }

  async addTitleTo(id: number, titleId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const genre = await this.db.genre.findFirst({ where: { id } });

    if (!genre) throw new BusinessError(GenreErrorKey.GENRE_NOT_EXSITS);

    const updatedGenre = await this.db.genre.update({
      where: {
        id,
      },
      data: {
        titles: {
          connect: {
            id: titleId,
          },
        },
      },
      include: {
        titles: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return updatedGenre;
  }
}
