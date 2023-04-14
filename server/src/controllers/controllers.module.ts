import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../data/database.module';
import { HealthController } from './health.controller';
import { ServiceModule } from 'src/services/services.module';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { ListController } from './list.controller';
import { TitleController } from './title.controller';
import { TitleCommentsController } from './title-comments.controller';
import { ChapterController } from './chapter.controller';
import { PageController } from './page.controller';
import { PageCommentsController } from './page-comments.controller';
import { GenreController } from './genre.controller';
import { SeedController } from './seed.controller';
import { RatingController } from './rating.controller';
import { AuthorController } from './author.controller';
import { ChapterLikesController } from './chapter-likes.controller';
import { TitleCommentLikesController } from './title-comment-likes.controller';
import { PageCommentLikesController } from './page-comment-likes.controller';

@Module({
  imports: [ConfigModule, DatabaseModule, ServiceModule],
  controllers: [
    HealthController,
    UserController,
    AuthController,
    ListController,
    TitleController,
    TitleCommentsController,
    ChapterController,
    PageController,
    PageCommentsController,
    GenreController,
    SeedController,
    RatingController,
    AuthorController,
    ChapterLikesController,
    TitleCommentLikesController,
    PageCommentLikesController,
  ],
})
export class ControllersModule {}
