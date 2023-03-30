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
  ],
})
export class ControllersModule {}
