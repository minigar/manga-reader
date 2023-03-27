import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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

  type?: TitleType;

  status?: TitleStatus;
}
