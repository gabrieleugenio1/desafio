import { ProductEntity } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMenuProduct } from './createMenuProduct.dto';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ProductsDTO {
  @ApiProperty({
    description: 'Product id',
    type: [CreateMenuProduct],
    example: ['id1', 'id2', '...'],
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  productIds: ProductEntity['id'][];
}
