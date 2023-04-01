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

@ValidatorConstraint({ name: 'validTitleSortOrder', async: false })
export class ValidTitleSortOrder implements ValidatorConstraintInterface {
  validate(sortBy: string) {
    return (
      sortBy === 'name' ||
      sortBy === 'type' ||
      sortBy === 'yearRelease' ||
      sortBy === 'status'
    );
  }

  defaultMessage() {
    return 'Sort by must be either "name" or  "type" or "yearRelease"or "status"';
  }
}

export class SortBodyModel {
  @IsOptional()
  @IsString()
  @Validate(ValidSortOrder)
  sortOrder?: 'asc' | 'desc';
}
export class TitleSortBodyModel {
  @IsOptional()
  @IsString()
  @Validate(ValidSortOrder)
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @Validate(ValidTitleSortOrder)
  sortBy?: 'name' | 'type' | 'yearRelease' | 'status';
}
