import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsPriceConstraint } from '../validators/validatorPrice.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNotEmpty()
  @Validate(IsPriceConstraint)
  price: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  image: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
