import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { UserErrorKey } from 'src/controllers/errorKeys';
import { UserBodyModel } from '../models/User.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
  async getList() {
    const users = await this.db.user.findMany();

    return users;
  }

  async getById(id: number) {
    const user = await this.db.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new BusinessError(UserErrorKey.USER_NOT_FOUND);
    }

    return user;
  }

  async updateById(id: number, payload: UserBodyModel) {
    const user = await this.db.user.findFirst({ where: { id } });
    return;
  }

  async deleteById(id: number) {
    await this.db.user.delete({ where: { id } });
    return;
  }
}
