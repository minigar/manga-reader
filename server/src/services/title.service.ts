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
  ) {
    const offset = (page - 1) * perPage;

    const titles = await this.db.title.findMany({
      skip: offset,
      take: perPage,
      orderBy: { [sortBy || 'name']: sortOrder || 'asc' },
    });

    return titles;
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
