import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../data/database.module';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ListService } from './list.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [UserService, AuthService, JwtService, ListService],
  exports: [UserService, AuthService, JwtService, ListService],
})
export class ServiceModule {}
