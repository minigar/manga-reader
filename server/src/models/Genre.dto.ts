import { IsOptional, IsString } from 'class-validator';
import { IsArrayOfNumbers } from './IsNumberStringArray';

export class GenreBodyModel {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class GenreQuerySort {
  @IsOptional()
  // @IsArrayOfNumbers({ message: 'must be al least one numeric string' })
  include?: number[];
  @IsOptional()
  // @IsArrayOfNumbers({ message: 'must be al least one numeric string' })
  exclude?: number[];
}
