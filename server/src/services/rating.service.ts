import { Injectable } from '@nestjs/common';
import {
  GeneralErrorKey,
  RatingErrorKey,
  TitleErrorKey,
} from 'src/controllers/errorKeys';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';

@Injectable()
export class RatingService {
  constructor(private readonly db: DatabaseService) {}
  async upsert(titleId: number, userId: number, value: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    if (value > 10 || value < 0)
      throw new BusinessError(RatingErrorKey.VALUE_BAD_REQUEST);

    if (typeof value !== 'number')
      throw new BusinessError(RatingErrorKey.RATE_MUST_BE_NUMBER);

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

  async deleteById(titleId: number, userId: number, id: number) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });
    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const rate = await this.db.rating.findFirst({ where: { id } });

    if (!rate) throw new BusinessError(RatingErrorKey.RATE_NOT_EXIST);

    const isMatches = userId === rate.userId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    await this.db.rating.delete({
      where: { id },
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
  }
}
