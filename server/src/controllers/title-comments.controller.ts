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
import { TitleCommentsService } from 'src/services/title-comments.service';
import { CurrentUser } from '../common/decorators /CurrentUser.decorator';

@Controller('titles/:titleId/comments')
export class TitleCommentsController {
  constructor(private readonly titleCommentsService: TitleCommentsService) {}

  @Public()
  @Get()
  async getList(@Param('titleId', ParseIntPipe) titleId: number) {
    return successResponse(await this.titleCommentsService.getList(titleId));
  }

  @Post(':parantId?')
  async create(
    @Body('message') message: string,
    @Param('titleId', ParseIntPipe) titleId: number,
    @CurrentUser() { userId },
    @Param('parantId') parantId?: number,
  ) {
    return successResponse(
      await this.titleCommentsService.create(
        titleId,
        Number(parantId),
        userId,
        message,
      ),
    );
  }

  @Put(':id')
  async updateById(
    @Body('message') message: string,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentsService.updateById(userId, id, message),
    );
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentsService.deleteById(userId, id),
    );
  }
}
