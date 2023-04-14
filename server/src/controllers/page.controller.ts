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

@Controller('titles/:titleId/chapters/:chapterNumber/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  @Public()
  async getList(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Query() { page, perPage }: PaginationBodyModel,
  ) {
    return successResponse(
      await this.pageService.getList(titleId, chapterNumber, page, perPage),
    );
  }

  @Get(':number')
  @Public()
  async getById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('number', ParseIntPipe) number: number,
  ) {
    return successResponse(
      await this.pageService.getById(titleId, chapterNumber, number),
    );
  }

  @Post()
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Body() { imgUri, number }: PageBodyModel,
  ) {
    return successResponse(
      await this.pageService.create(titleId, chapterNumber, imgUri, number),
    );
  }

  @Put(':number')
  async updateById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('number', ParseIntPipe) number: number,
    @Body() { imgUri }: PageUpdateBodyModel,
  ) {
    return successResponse(
      await this.pageService.updateById(titleId, chapterNumber, number, imgUri),
    );
  }

  @Delete(':number')
  async delete(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('number', ParseIntPipe) number: number,
  ) {
    return successResponse(
      await this.pageService.delete(titleId, chapterNumber, number),
    );
  }
}
