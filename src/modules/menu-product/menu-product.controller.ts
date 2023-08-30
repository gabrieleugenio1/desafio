import {
  Controller,
  Delete,
  Get,
  Param,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { MenuProductService } from './menu-product.service';
import { CuidPipe } from '../../pipes/cuid.pipe';
import { ProductsDTO } from './dtos/Products.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { MenuProductEntity } from './entities/MenuProduct.entity';

@ApiTags('Menu-Product')
@Controller('menu-product')
export class MenuProductController {
  constructor(private readonly menuProductService: MenuProductService) {}

  @Post(':menuId/add-product')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description:
      'Created - The product has been successfully added to the menu.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Product exists or price invalid!',
  })
  @ApiNotFoundResponse({
    description: 'Not Found - Menu or Product not found!',
  })
  @ApiOperation({ summary: 'Add products to menu.' })
  async addProductToMenu(
    @Param('menuId', new CuidPipe()) menuId: string,
    @Body() productIds: ProductsDTO,
  ) {
    return this.menuProductService.addProductsToMenu(menuId, productIds);
  }

  @Get(':menuId/products')
  @ApiResponse({ status: 200, description: 'Success - All products in menu!' })
  @ApiNotFoundResponse({
    description: 'Not Found - MenuId not found or No products found!',
  })
  @ApiOperation({ summary: 'List all products in menu.' })
  async listProductsInMenu(
    @Param('menuId', new CuidPipe()) menuId: string,
  ): Promise<MenuProductEntity[]> {
    return this.menuProductService.listProductsInMenu(menuId);
  }

  @Delete(':menuId/remove-product')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description:
      'Success - The product has been successfully removed from the menu.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found - Menu or Product not found!',
  })
  @ApiOperation({ summary: 'Remove products from menu.' })
  async removeProductFromMenu(
    @Param('menuId', new CuidPipe()) menuId: string,
    @Body() menuProductId: ProductsDTO,
  ): Promise<{ message: string }> {
    return this.menuProductService.removeProductsFromMenu(
      menuId,
      menuProductId,
    );
  }

  @Delete(':menuId/remove-all-products')
  @ApiResponse({
    status: 200,
    description:
      'Success - All products has been successfully removed from the menu.',
  })
  @ApiNotFoundResponse({ description: 'Not Found - Menu not found!' })
  @ApiOperation({ summary: 'Remove all products from menu.' })
  async removeAllProductsFromMenu(
    @Param('menuId', new CuidPipe()) menuId: string,
  ): Promise<{ message: string }> {
    return this.menuProductService.removeAllProductsFromMenu(menuId);
  }
}
