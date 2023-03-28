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
import { Public } from 'src/common/decorators ';
import { successResponse } from 'src/helpers/success-response';
import { ChapterService } from 'src/services/chapter.service';
import { ChapterBOdyModel } from '../models/Chapter.dto';

@Controller('titles/:titleId/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}
  @Get()
  @Public()
  async getList(@Param('titleId', ParseIntPipe) titleId: number) {
    return successResponse(await this.chapterService.getList(titleId));
  }

  @Get(':id')
  @Public()
  async getById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return successResponse(await this.chapterService.getById(id));
  }

  @Post()
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Body() { name }: ChapterBOdyModel,
  ) {
    return successResponse(await this.chapterService.create(titleId, name));
  }

  @Put(':id')
  async updateById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() { name }: ChapterBOdyModel,
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
