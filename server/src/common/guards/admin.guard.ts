import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from '../enums/user.enum';
import { UserService } from '../../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const req = await context.switchToHttp().getRequest();

    if (req?.user) {
      const { id } = req.user;

      const user = await this.usersService.getById(id);
      return user.role === UserRoles.ADMIN;
    }
  }
}
