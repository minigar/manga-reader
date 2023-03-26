import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../data/database.module';
import { UsersService } from './user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService, AuthService, JwtService],
})
export class ServiceModule {}
