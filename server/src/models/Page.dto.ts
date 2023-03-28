import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PageBodyModel {
  @IsNotEmpty()
  @IsString()
  imgUri: string;

  @IsNumber()
  number?: number;
}

export class PageUpdateBodyModel {
  @IsNotEmpty()
  @IsString()
  imgUri: string;
}
