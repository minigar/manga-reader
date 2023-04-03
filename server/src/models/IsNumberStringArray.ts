import {
  ArrayMinSize,
  IsNumberString,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNumberStringArray', async: false })
export class IsNumberStringArray implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }

    if (value.length === 0) {
      return false;
    }
    // try {
    //   if (!ArrayMinSize(value, args.constraints[0])) {
    //     return false;
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    if (value.some((item: any) => !IsNumberString(item))) {
      return false;
    }

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'Array must contain at least one numeric string';
  }
}

export function IsArrayOfNumbers(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'arrayOfNumbers',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const isNumberStringArray = new IsNumberStringArray();
          return isNumberStringArray.validate(value, args); // pass both value and args
        },
      },
    });
  };
}
