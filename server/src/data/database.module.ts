import { Module } from '@nestjs/common';
import { DatabaseService } from '../data/database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
