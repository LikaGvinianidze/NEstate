import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsNumber(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return !isNaN(value);
        },
      },
    });
  };
}
