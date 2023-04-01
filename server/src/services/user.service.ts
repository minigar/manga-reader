import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';
import { AuthErrorKey, UserErrorKey } from 'src/controllers/errorKeys';
import { UserUpdate } from '../models/User.dto';
import * as bcrypt from 'bcrypt';
import { GeneralErrorKey } from 'src/controllers/errorKeys/GeneralErrorKey';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
  async getList() {
    const users = await this.db.user.findMany();

    return users;
  }

  async getById(id: number) {
    const user = await this.db.user.findFirst({
      where: { id },
      include: {
        lists: true,
      },
    });

    if (!user) {
      throw new BusinessError(UserErrorKey.USER_NOT_FOUND);
    }

    return user;
  }

  async updateById(id: number, payload: UserUpdate, userId: number) {
    const user = await this.db.user.findFirst({ where: { id } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const isPassMatches = await bcrypt.compare(payload.password, user.password);

    if (!isPassMatches)
      throw new BusinessError(AuthErrorKey.PASSWORDS_ARE_NOT_SAME);

    const isIdMatches = userId === id;

    if (!isIdMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    if (payload.email !== user.email)
      throw new BusinessError(AuthErrorKey.EMAIL_NOT_MACTHES);

    return await this.db.user.update({
      where: { id },
      data: {
        name: payload.name,
        email: payload.email,
        avatarImgUri: payload.avatarImgUri,
      },
    });
  }

  async deleteById(id: number, userId: number) {
    const user = await this.db.user.findFirst({ where: { id } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const isIdMacthes = id === userId;

    if (!isIdMacthes) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    await this.db.user.delete({ where: { id } });

    return;
  }
}
