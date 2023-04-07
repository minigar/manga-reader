import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { successResponse } from 'src/helpers/success-response';
import { RatingService } from 'src/services/rating.service';
import { CurrentUser } from 'src/common/decorators';

@Controller('titles/:titleId/rate')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async upsert(
    @Param('titleId', ParseIntPipe) titleId: number,
    @CurrentUser() { userId },
    @Body('value') value: number,
  ) {
    return successResponse(
      await this.ratingService.upsert(titleId, userId, value),
    );
  }

  @Delete(':id')
  async deleteById(
    @Param('titleId', ParseIntPipe) titleId: number,
    @CurrentUser() { userId },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return successResponse(
      await this.ratingService.deleteById(titleId, userId, id),
    );
  }
}
