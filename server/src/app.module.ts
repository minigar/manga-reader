import { Module } from '@nestjs/common';
import { DatabaseModule } from './data/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { ServiceModule } from 'src/services/services.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './auth/strategies';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';

@Module({
  imports: [
    JwtModule.register({}),
    DatabaseModule,
    ControllersModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
