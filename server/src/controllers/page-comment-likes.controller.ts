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
import { PageCommentLikesService } from 'src/services/page-comment-likes.service';

@Controller(
  'titles/:titleId/chapters/:chapterNumber/pages/:pageNumber/comments/:commentId',
)
export class PageCommentLikesController {
  constructor(
    private readonly pageCommentLikesService: PageCommentLikesService,
  ) {}

  @Get('likes')
  @Public()
  async getAmount(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return successResponse(
      await this.pageCommentLikesService.getAmount(
        titleId,
        chapterNumber,
        pageNumber,
        commentId,
      ),
    );
  }

  @Post('likes')
  async addLike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.pageCommentLikesService.addLike(
        titleId,
        chapterNumber,
        pageNumber,
        commentId,
        userId,
      ),
    );
  }

  @Post('dislikes')
  async addDislike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.pageCommentLikesService.addDislike(
        titleId,
        chapterNumber,
        pageNumber,
        userId,
        commentId,
      ),
    );
  }

  @Delete('likes')
  async deleteLike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.pageCommentLikesService.deleteLike(
        titleId,
        chapterNumber,
        pageNumber,
        userId,
        commentId,
      ),
    );
  }

  @Delete('dislikes')
  async deleteDislike(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.pageCommentLikesService.deleteDislike(
        titleId,
        chapterNumber,
        pageNumber,
        userId,
        commentId,
      ),
    );
  }
}
