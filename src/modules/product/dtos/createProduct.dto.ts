import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsPriceConstraint } from '../validators/validatorPrice.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CuidPipe } from '../../../pipes/cuid.pipe';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({type: Number})
  @IsNotEmpty()
  @Validate(IsPriceConstraint)
  price: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary', })
  @IsOptional()
  @IsNotEmpty()
  image: any;

  @ApiPropertyOptional({nullable: false})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(CuidPipe)
  categoryId: string;

}
