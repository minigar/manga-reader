import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Public } from 'src/common/decorators ';
import { successResponse } from 'src/helpers/success-response';
import { UsersService } from 'src/services/user.service';
import { UserBodyModel } from '../models/User.dto';

@Public()
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getList() {
    return successResponse(await this.usersService.getList());
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.usersService.getById(id));
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    payload: UserBodyModel,
  ) {
    return successResponse(await this.usersService.updateById(id, payload));
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.usersService.deleteById(id));
  }
}
