import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserBodyModel {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserDecoded {
  userId: number;
  name: string;
  email: string;
  refreshTokenId: string;
  iat: number;
  exp: number;
}
