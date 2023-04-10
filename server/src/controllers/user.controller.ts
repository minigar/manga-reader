import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CurrentUser, Public } from 'src/common/decorators';
import { successResponse } from 'src/helpers/success-response';
import { UserService } from 'src/services/user.service';
import { UserUpdate } from '../models/User.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getList() {
    return successResponse(await this.userService.getList());
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.userService.getById(id));
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UserUpdate,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.userService.updateById(id, payload, userId),
    );
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(await this.userService.deleteById(id, userId));
  }
}
