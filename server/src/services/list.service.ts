import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { UserErrorKey } from '../controllers/errorKeys/UserErrorKey';
import { ListErrorKey } from '../controllers/errorKeys/ListErrorKey';

@Injectable()
export class ListService {
  constructor(private readonly db: DatabaseService) {}
  async getList(userId: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const lists = await this.db.list.findMany({ where: { userId } });

    return lists;
  }

  async getById(userId: number, id: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const list = await this.db.list.findFirst({ where: { id } });

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
    });
  }

  async deleteById(userId: number, id: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const list = await this.db.list.delete({ where: { id } });

    if (!list) throw new BusinessError(ListErrorKey.LIST_NOT_FOUND);

    return;
  }
}
