import { IsOptional, IsString } from 'class-validator';

export class GenreBodeModel {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
