import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ChapterBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsNumber()
  volume: number;
}
