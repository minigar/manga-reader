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
import { TitleBodyModel } from 'src/models/Title.dto';
import { TitleService } from 'src/services/title.service';
import { PaginationBodyModel } from '../models/Pagination.dto';
import { TitleSortBodyModel } from 'src/models/SortBodyModel';

@Controller('titles')
export class TitleController {
  constructor(private readonly titleServie: TitleService) {}

  @Public()
  @Get()
  async getList(
    @Query() { page, perPage }: PaginationBodyModel,
    @Query() { sortBy, sortOrder }: TitleSortBodyModel,
  ) {
    return successResponse(
      await this.titleServie.getList(
        Number(page),
        Number(perPage),
        sortBy,
        sortOrder,
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
