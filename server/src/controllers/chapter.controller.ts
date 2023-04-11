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
import { ChapterService } from 'src/services/chapter.service';
import {
  ChapterBodyModel,
  ChapterUpdateBodyModel,
} from '../models/Chapter.dto';
import { SortBodyModel } from '../models/SortBodyModel';

@Controller('titles/:titleId/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get()
  @Public()
  async getList(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Query() { sortOrder }: SortBodyModel,
  ) {
    return successResponse(
      await this.chapterService.getList(titleId, sortOrder),
    );
  }

  @Get(':c')
  @Public()
  async getById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('c', ParseIntPipe) number: number,
  ) {
    return successResponse(await this.chapterService.getById(titleId, number));
  }

  @Post()
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Body() { name, number, volume }: ChapterBodyModel,
  ) {
    return successResponse(
      await this.chapterService.create(titleId, name, number, volume),
    );
  }

  @Put(':id')
  async updateById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() { name }: ChapterUpdateBodyModel,
  ) {
    return successResponse(
      await this.chapterService.updateById(titleId, id, name),
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.chapterService.delete(id));
  }
}
