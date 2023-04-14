import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CurrentUser, Public } from 'src/common/decorators';
import { successResponse } from 'src/helpers/success-response';
import { ChapterLikesService } from 'src/services/chapter-likes.service';

@Controller('titles/:titleId/chapters/:chapterNumber/likes')
export class ChapterLikesController {
  constructor(private readonly chapterLikesService: ChapterLikesService) {}

  @Get()
  @Public()
  async getAmount(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
  ) {
    return successResponse(
      await this.chapterLikesService.getAmount(titleId, chapterNumber),
    );
  }

  @Post()
  async addLike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.chapterLikesService.addLike(titleId, chapterNumber, userId),
    );
  }

  @Delete()
  async deleteLike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.chapterLikesService.deleteLike(titleId, chapterNumber, userId),
    );
  }
}
