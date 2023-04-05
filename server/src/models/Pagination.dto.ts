import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationBodyModel {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  perPage: number;
}
