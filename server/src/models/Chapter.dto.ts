import { IsNotEmpty, IsString } from 'class-validator';

export class ChapterBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;
}
