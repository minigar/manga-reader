import { Module } from '@nestjs/common';
import { DatabaseModule } from './data/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { ServiceModule } from 'src/services/services.module';

@Module({
  imports: [DatabaseModule, ControllersModule, ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
