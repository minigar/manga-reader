import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsNumberString,
} from 'class-validator';

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

export class ChapterUpdateBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ChapterQuerySort {
  @IsOptional()
  @IsNumberString()
  chapterMin?: number;

  @IsOptional()
  @IsNumberString()
  chapterMax?: number;
}
