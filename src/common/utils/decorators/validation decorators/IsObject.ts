import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

export function IsObject(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isObject',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value !== null && typeof value === 'object' ? true : false;
        },
      },
    });
  };
}
