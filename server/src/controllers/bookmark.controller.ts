import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { successResponse } from 'src/helpers/success-response';
import { CurrentUser } from '../common/decorators/CurrentUser.decorator';
import { BookmarkService } from 'src/services/bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async getList(@CurrentUser() { userId }) {
    return successResponse(await this.bookmarkService.getList(userId));
  }

  @Post(':titleId/:chapterNumber/:pageNumber')
  async create(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @CurrentUser() { userId },
  ) {
    return successResponse(
      await this.bookmarkService.upsert(
        titleId,
        chapterNumber,
        pageNumber,
        userId,
      ),
    );
  }

  @Delete(':titleId/:chapterNumber/:pageNumber')
  async deleteById(
    @CurrentUser() { userId },
    @Param('titleId', ParseIntPipe) titleId: number,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
  ) {
    return successResponse(
      await this.bookmarkService.deleteById(
        userId,
        titleId,
        chapterNumber,
        pageNumber,
      ),
    );
  }
}
