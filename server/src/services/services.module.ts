import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../data/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [],
  exports: [],
})
export class ServiceModule {}
