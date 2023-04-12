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

@Controller(
  'titles/:titleId/chapters/:chapterNumber/pages/:pageNumber/comments',
)
export class PageCommentsController {
  constructor(private readonly pageCommentsService: PageCommentsService) {}

  @Public()
  @Get()
  async getList(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Query() { page, perPage }: PaginationBodyModel,
  ) {
    return successResponse(
      await this.pageCommentsService.getList(
        titleId,
        chapterNumber,
        pageNumber,
        page,
        perPage,
      ),
    );
  }

  @Post(':parentId?')
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @CurrentUser() { userId },
    @Body('message') message: string,
    @Param('parentId') parentId?: number,
  ) {
    return successResponse(
      await this.pageCommentsService.create(
        titleId,
        chapterNumber,
        pageNumber,
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
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Body('message') message: string,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.pageCommentsService.updateById(
        id,
        titleId,
        chapterNumber,
        pageNumber,
        userId,
        message,
      ),
    );
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.pageCommentsService.deleteById(
        id,
        titleId,
        chapterNumber,
        pageNumber,
        userId,
      ),
    );
  }
}
