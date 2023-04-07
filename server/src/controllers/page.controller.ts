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
import { successResponse } from 'src/helpers/success-response';
import { PageService } from '../services/page.service';
import { Public } from '../common/decorators/Public.decorator';
import { PageBodyModel, PageUpdateBodyModel } from 'src/models/Page.dto';
import { PaginationBodyModel } from '../models/Pagination.dto';

@Controller('titles/:titleId/chapters/:chapterId/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  @Public()
  async getList(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Query() { page, perPage }: PaginationBodyModel,
  ) {
    return successResponse(
      await this.pageService.getList(
        titleId,
        chapterId,
        Number(page),
        Number(perPage),
      ),
    );
  }

  @Get(':id')
  @Public()
  async getById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return successResponse(
      await this.pageService.getById(titleId, chapterId, id),
    );
  }

  @Post()
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Body() { imgUri, number }: PageBodyModel,
  ) {
    return successResponse(
      await this.pageService.create(titleId, chapterId, imgUri, number),
    );
  }

  @Put(':id')
  async updateById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() { imgUri }: PageUpdateBodyModel,
  ) {
    return successResponse(
      await this.pageService.updateById(titleId, chapterId, id, imgUri),
    );
  }

  @Delete(':id')
  async delete(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return successResponse(
      await this.pageService.delete(titleId, chapterId, id),
    );
  }
}
