import {
  IsOptional,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validSortOrder', async: false })
export class ValidSortOrder implements ValidatorConstraintInterface {
  validate(sortOrder: string) {
    return sortOrder === 'asc' || sortOrder === 'desc';
  }

  defaultMessage() {
    return 'Sort order must be either "asc" or "desc"';
  }
}

export class SortBodyModel {
  @IsOptional()
  @IsString()
  @Validate(ValidSortOrder)
  sortOrder?: 'asc' | 'desc';
}
