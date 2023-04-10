import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../data/database.module';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ListService } from './list.service';
import { TitleService } from './title.service';
import { TitleCommentsService } from './title-comments.service';
import { ChapterService } from './chapter.service';
import { PageService } from './page.service';
import { PageCommentsService } from './page-comments.service';
import { GenreService } from './genre.service';
import { SeedService } from './seed.service';
import { RatingService } from './rating.service';
import { AuthorService } from './author.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    UserService,
    AuthService,
    JwtService,
    ListService,
    TitleService,
    TitleCommentsService,
    ChapterService,
    PageService,
    PageCommentsService,
    GenreService,
    SeedService,
    RatingService,
    AuthorService,
  ],
  exports: [
    UserService,
    AuthService,
    JwtService,
    ListService,
    TitleService,
    TitleCommentsService,
    ChapterService,
    PageService,
    PageCommentsService,
    GenreService,
    SeedService,
    RatingService,
    AuthorService,
  ],
})
export class ServiceModule {}
