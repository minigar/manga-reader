import { IsOptional, IsString } from 'class-validator';

export class GenreBodyModel {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
