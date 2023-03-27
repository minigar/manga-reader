import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { successResponse } from 'src/helpers/success-response';
import { ListService } from '../services/list.service';
import { CurrentUser } from 'src/common/decorators ';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getList(@CurrentUser() { userId }) {
    return successResponse(await this.listService.getList(userId));
  }

  @Get(':id')
  async getById(
    @CurrentUser() { userId },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return successResponse(await this.listService.getById(userId, id));
  }

  @Post()
  async create(@CurrentUser() { userId }, @Body('name') name: string) {
    return successResponse(await this.listService.create(userId, name));
  }

  @Put(':id')
  async updateById(
    @CurrentUser() { userId },
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    return successResponse(await this.listService.updateById(userId, id, name));
  }

  @Delete(':id')
  async deleteById(
    @CurrentUser() { userId },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return successResponse(await this.listService.deleteById(userId, id));
  }
}
