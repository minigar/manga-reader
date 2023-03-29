import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { UserErrorKey } from '../controllers/errorKeys/UserErrorKey';
import { ListErrorKey } from '../controllers/errorKeys/ListErrorKey';
import { TitleErrorKey } from 'src/controllers/errorKeys';
import { GeneralErrorKey } from '../controllers/errorKeys/GeneralErrorKey';

const ListIncludes = {
  titles: {
    select: {
      id: true,
      name: true,
    },
  },
};

@Injectable()
export class ListService {
  constructor(private readonly db: DatabaseService) {}
  async getList(userId: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const lists = await this.db.list.findMany({
      where: { userId },
      include: ListIncludes,
    });

    return lists;
  }

  async getById(userId: number, id: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const list = await this.db.list.findFirst({
      where: { id },
      include: ListIncludes,
    });

    if (!list) throw new BusinessError(ListErrorKey.LIST_NOT_FOUND);

    return list;
  }

  async create(userId: number, name: string) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const list = await this.db.list.create({
      data: {
        userId,
        name,
      },
    });

    return list;
  }

  async updateById(userId: number, id: number, name: string) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const list = await this.db.list.findFirst({ where: { id } });

    if (!list) throw new BusinessError(ListErrorKey.LIST_NOT_FOUND);

    return await this.db.list.update({
      where: { id },
      data: { name },
      include: ListIncludes,
    });
  }

  async deleteById(userId: number, id: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const list = await this.db.list.delete({ where: { id } });

    if (!list) throw new BusinessError(ListErrorKey.LIST_NOT_FOUND);

    return;
  }

  async addToList(userId: number, id: number, titleId: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const list = await this.db.list.findFirst({ where: { id } });

    if (!list) throw new BusinessError(ListErrorKey.LIST_NOT_FOUND);

    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const isMatches = userId === list.userId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    const updatedList = await this.db.list.update({
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
      include: ListIncludes,
    });

    return updatedList;
  }
}
