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
import { TitleCommentLikesService } from 'src/services/title-comment-likes.service';

@Controller('titles/:titleId/comments/:commentId')
export class TitleCommentLikesController {
  constructor(
    private readonly titleCommentLikesService: TitleCommentLikesService,
  ) {}

  @Get('likes')
  @Public()
  async getAmount(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return successResponse(
      await this.titleCommentLikesService.getAmount(titleId, commentId),
    );
  }

  @Post('likes')
  async addLike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentLikesService.addLike(titleId, userId, commentId),
    );
  }

  @Post('dislikes')
  async addDislike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentLikesService.addDislike(
        titleId,
        userId,
        commentId,
      ),
    );
  }

  @Delete('likes')
  async deleteLike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentLikesService.deleteLike(
        titleId,
        userId,
        commentId,
      ),
    );
  }

  @Delete('dislikes')
  async deleteDislike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.titleCommentLikesService.deleteDislike(
        titleId,
        userId,
        commentId,
      ),
    );
  }
}
