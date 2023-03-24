import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { BusinessErrorFilter } from './businessError';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: BusinessErrorFilter,
    },
  ],
})
export class BusinessErrorModule {}
