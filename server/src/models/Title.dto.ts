import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { TitleType } from 'src/common/enums/title.enum';
import { TitleStatus } from '../common/enums/title.enum';

export class TitleBodyModel {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  yearRelease?: number;

  @IsNotEmpty()
  type: TitleType;

  @IsNotEmpty()
  status: TitleStatus;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsOptional()
  @IsUrl()
  imgUrl?: string;
}

export class TitleUpdateBodyModel {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  yearRelease?: number;

  @IsOptional()
  type?: TitleType;

  @IsOptional()
  status?: TitleStatus;

  @IsOptional()
  @IsUrl()
  imgUrl?: string;
}

export class YearReleaseQuerySort {
  @IsOptional()
  @IsNumberString()
  min?: number;

  @IsOptional()
  @IsNumberString()
  max?: number;
}
