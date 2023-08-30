import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPrice', async: false })
export class IsPriceConstraint implements ValidatorConstraintInterface {
  validate(price: string | number) {
    return !isNaN(Number(price));
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid price format for ${args.property}`;
  }
}
