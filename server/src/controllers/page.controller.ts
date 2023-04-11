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

@Controller('titles/:titleId/chapters/:c/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  @Public()
  async getList(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('c', ParseIntPipe) c: number,
    @Query() { page, perPage }: PaginationBodyModel,
  ) {
    return successResponse(
      await this.pageService.getList(titleId, c, page, perPage),
    );
  }

  @Get(':number')
  @Public()
  async getById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('c', ParseIntPipe) c: number,
    @Param('number', ParseIntPipe) number: number,
  ) {
    return successResponse(await this.pageService.getById(titleId, c, number));
  }

  @Post()
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('c', ParseIntPipe) c: number,
    @Body() { imgUri, number }: PageBodyModel,
  ) {
    return successResponse(
      await this.pageService.create(titleId, c, imgUri, number),
    );
  }

  @Put(':number')
  async updateById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('c', ParseIntPipe) c: number,
    @Param('number', ParseIntPipe) number: number,
    @Body() { imgUri }: PageUpdateBodyModel,
  ) {
    return successResponse(
      await this.pageService.updateById(titleId, c, number, imgUri),
    );
  }

  @Delete(':number')
  async delete(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('c', ParseIntPipe) c: number,
    @Param('number', ParseIntPipe) number: number,
  ) {
    return successResponse(await this.pageService.delete(titleId, c, number));
  }
}
