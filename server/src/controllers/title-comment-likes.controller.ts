import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CurrentUser, Public } from 'src/common/decorators';
import { successResponse } from 'src/helpers/success-response';
import { TitleCommentLikesService } from 'src/services/title-comment-likes.service';

@Controller('titles/:titleId/comments/:commentId/likes')
export class TitleCommentLikesController {
  constructor(
    private readonly titleCommentLikesService: TitleCommentLikesService,
  ) {}

  @Get()
  @Public()
  async getAmount(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return successResponse(
      await this.titleCommentLikesService.getAmount(titleId, commentId),
    );
  }

  @Post()
  async addLike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentLikesService.addLike(titleId, userId, commentId),
    );
  }
}
