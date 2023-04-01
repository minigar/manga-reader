import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { successResponse } from 'src/helpers/success-response';
import { GenreService } from '../services/genre.service';
import { GenreBodeModel } from '../models/Genre.dto';
import { Public } from 'src/common/decorators ';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Public()
  @Get()
  async getList() {
    return successResponse(await this.genreService.getList());
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.genreService.getById(id));
  }

  @Post()
  async create(@Body() { name, description }: GenreBodeModel) {
    return successResponse(await this.genreService.create(name, description));
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, description }: GenreBodeModel,
  ) {
    return successResponse(
      await this.genreService.updateById(id, name, description),
    );
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.genreService.deleteById(id));
  }

  @Patch(':id/titles/:titleId')
  async addToList(
    @Param('id', ParseIntPipe) id: number,
    @Param('titleId', ParseIntPipe) titleId: number,
  ) {
    return successResponse(await this.genreService.addToList(id, titleId));
  }
}
