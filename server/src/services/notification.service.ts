import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { UserErrorKey } from '../controllers/errorKeys/UserErrorKey';

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

    const nofitication = await this.db.titleNotification.findFirst({
      where: { users: { some: { id: userId } } },
    });

    if (!nofitication) throw new BusinessError('nofitication not found!');

    await this.db.titleNotification.update({
      where: { id },
      data: { users: { disconnect: { id: userId } } },
    });

    return;
  }
}
