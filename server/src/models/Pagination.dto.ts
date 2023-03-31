import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PaginationBodyModel {
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  perPage: number;
}
