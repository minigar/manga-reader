import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;
}
