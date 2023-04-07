import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { successResponse } from 'src/helpers/success-response';
import { RatingService } from 'src/services/rating.service';
import { CurrentUser } from 'src/common/decorators';

@Controller('titles/:titleId/rate')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async createForTitle(
    @Param('titleId', ParseIntPipe) titleId: number,
    @CurrentUser() { userId },
    @Body('value') value: number,
  ) {
    return successResponse(
      await this.ratingService.createForTitle(titleId, userId, value),
    );
  }
}
