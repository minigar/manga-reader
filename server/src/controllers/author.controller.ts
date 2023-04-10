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
import { Public } from 'src/common/decorators';
import { successResponse } from 'src/helpers/success-response';
import { AuthorBodyModel } from 'src/models/Author.dto';
import { AuthorService } from 'src/services/author.service';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  @Public()
  async getList() {
    return successResponse(await this.authorService.getList());
  }

  @Get(':id')
  @Public()
  async getById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.authorService.getById(id));
  }

  @Post()
  async create(@Body() { name }: AuthorBodyModel) {
    return successResponse(await this.authorService.create(name));
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name }: AuthorBodyModel,
  ) {
    return successResponse(await this.authorService.updateById(id, name));
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return successResponse(await this.authorService.deleteById(id));
  }
}
