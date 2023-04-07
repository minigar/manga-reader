import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';

@Injectable()
export class RatingService {
  constructor(private readonly db: DatabaseService) {}
  async createForTitle(titleId: number, userId: number, value: number) {
    const rating = await this.db.rating.findFirst({
      where: { titleId, userId },
    });

    if (rating) throw new BusinessError('You already rate this title');

    const upsertRating = await this.db.rating.upsert({
      where: { titleId_userId: { titleId, userId } },
      update: { value },
      create: {
        value,
        title: { connect: { id: titleId } },
        user: { connect: { id: userId } },
      },
    });

    const titleRatings = await this.db.rating.findMany({
      where: { titleId },
      select: { value: true },
    });

    const titleRatingCount = titleRatings.length;

    const titleRatingTotal = titleRatings.reduce(
      (total, rating) => total + rating.value,
      0,
    );

    const titleRatingAverage = titleRatingTotal / titleRatingCount;

    await this.db.title.update({
      where: { id: titleId },
      data: { rating: titleRatingAverage },
    });

    return upsertRating;
  }
}
