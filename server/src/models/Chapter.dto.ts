import { IsNotEmpty, IsString } from 'class-validator';

export class ChapterBOdyModel {
  @IsNotEmpty()
  @IsString()
  name: string;
}
