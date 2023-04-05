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
import { Public } from 'src/common/decorators ';
import { successResponse } from 'src/helpers/success-response';
import { TitleBodyModel, YearReleaseQuerySort } from 'src/models/Title.dto';
import { TitleService } from 'src/services/title.service';
import { PaginationBodyModel } from '../models/Pagination.dto';
import { TitleSortBodyModel } from 'src/models/SortBodyModel';
import { GenreQuerySort } from 'src/models/Genre.dto';
import { TitleStatus, TitleType } from '@prisma/client';

@Controller('titles')
export class TitleController {
  constructor(private readonly titleServie: TitleService) {}

  @Public()
  @Get()
  async getList(
    @Query() { page, perPage }: PaginationBodyModel,
    @Query() { sortBy, sortOrder }: TitleSortBodyModel,
    @Query('genres') genres?: GenreQuerySort,
    @Query('types') types?: TitleType[],
    @Query('status') status?: TitleStatus[],
    @Query('yearRelease') yearRelease?: YearReleaseQuerySort,
  ) {
    return successResponse(
      await this.titleServie.getList(
        page,
        perPage,
        sortBy,
        sortOrder,
        genres?.include,
        genres?.exclude,
        types,
        status,
        yearRelease?.min,
        yearRelease?.max,
      ),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.titleServie.getById(id));
  }

  @Post()
  async create(
    @Body() { name, description, yearRelease, type, status }: TitleBodyModel,
  ) {
    return successResponse(
      await this.titleServie.create({
        name,
        description,
        yearRelease,
        type,
        status,
      }),
    );
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, description, yearRelease, type, status }: TitleBodyModel,
  ) {
    return successResponse(
      await this.titleServie.updateById(id, {
        name,
        description,
        yearRelease,
        type,
        status,
      }),
    );
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.titleServie.deleteById(id));
  }
}
