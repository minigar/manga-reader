import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { successResponse } from 'src/helpers/success-response';
import { TitleCommentsService } from 'src/services/title-comments.service';
import { CurrentUser } from '../common/decorators/CurrentUser.decorator';
import { PaginationBodyModel } from 'src/models/Pagination.dto';

@Controller('titles/:titleId/comments')
export class TitleCommentsController {
  constructor(private readonly titleCommentsService: TitleCommentsService) {}

  @Public()
  @Get()
  async getList(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Query() { page, perPage }: PaginationBodyModel,
  ) {
    return successResponse(
      await this.titleCommentsService.getList(
        titleId,
        Number(page),
        Number(perPage),
      ),
    );
  }

  @Post(':parentId?')
  async create(
    @Body('message') message: string,
    @Param('titleId', ParseIntPipe) titleId: number,
    @CurrentUser() { userId },
    @Param('parentId') parentId?: number,
  ) {
    return successResponse(
      await this.titleCommentsService.create(
        titleId,
        Number(parentId),
        userId,
        message,
      ),
    );
  }

  @Put(':id')
  async updateById(
    @Body('message') message: string,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentsService.updateById(userId, id, message),
    );
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentsService.deleteById(userId, id),
    );
  }
}
