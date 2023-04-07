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
import { CurrentUser } from '../common/decorators/CurrentUser.decorator';
import { PageCommentsService } from '../services/page-comments.service';
import { PaginationBodyModel } from '../models/Pagination.dto';

@Controller('titles/:titleId/chapters/:chapterId/pages/:pageId/comments')
export class PageCommentsController {
  constructor(private readonly pageCommentsService: PageCommentsService) {}

  @Public()
  @Get()
  async getList(
    @Param('pageId', ParseIntPipe) pageId: number,
    @Query() { page, perPage }: PaginationBodyModel,
  ) {
    return successResponse(
      await this.pageCommentsService.getList(
        pageId,
        Number(page),
        Number(perPage),
      ),
    );
  }

  @Post(':parentId?')
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
    @CurrentUser() { userId },
    @Body('message') message: string,
    @Param('parentId') parentId?: number,
  ) {
    return successResponse(
      await this.pageCommentsService.create(
        titleId,
        chapterId,
        pageId,
        userId,
        message,
        Number(parentId),
      ),
    );
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
    @CurrentUser() { userId },
    @Body('message') message: string,
  ) {
    return successResponse(
      await this.pageCommentsService.updateById(
        id,
        pageId,
        titleId,
        chapterId,
        userId,
        message,
      ),
    );
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.pageCommentsService.deleteById(userId, id),
    );
  }
}
