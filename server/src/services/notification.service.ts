import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { UserErrorKey } from '../controllers/errorKeys/UserErrorKey';
import { ListErrorKey } from '../controllers/errorKeys/ListErrorKey';

@Injectable()
export class NotificationService {
  constructor(private readonly db: DatabaseService) {}
  async getList(userId: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const nofitication = await this.db.titleNotification.findMany({
      where: { users: { some: { id: userId } } },
    });

    return nofitication;
  }

  async deleteById(userId: number, id: number) {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const list = await this.db.list.delete({ where: { id } });

    if (!list) throw new BusinessError(ListErrorKey.LIST_NOT_FOUND);

    await this.db.list.delete({ where: { id } });

    return;
  }
}
