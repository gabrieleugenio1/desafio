import { IsNotEmpty, Validate } from 'class-validator';
import { IsPriceConstraint } from '../../product/validators/validatorPrice.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuProduct {
  @ApiProperty({description: 'Product id'})
  @IsNotEmpty()
  @Validate(IsPriceConstraint)
  productId: string;
}
