import { IsNotEmpty, IsString } from 'class-validator';

export class ListBodyModel {
  @IsString()
  @IsNotEmpty()
  name: string;
}
