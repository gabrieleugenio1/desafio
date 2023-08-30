import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MenuProductEntity } from './entities/MenuProduct.entity';
import { MenuService } from '../menu/menu.service';
import { ProductService } from '../product/product.service';
import { ProductsDTO } from './dtos/Products.dto';

@Injectable()
export class MenuProductService {
  constructor(
    private prisma: PrismaService,
    private menuService: MenuService,
    private productService: ProductService,
  ) {}

  // Add products to menu
  async addProductsToMenu(
    menuId: string,
    productIds: ProductsDTO,
  ): Promise<MenuProductEntity[]> {
    // Check if menu exists
    const menu = await this.menuService.findById(menuId);
    // If menu does not exists, throw an error
    if (!menu) {
      throw new NotFoundException('Menu not found.');
    }
    // Create an array of menu products to show in the response
    const menuProducts: MenuProductEntity[] = [];
    // Check array of products
    for (const productId of productIds?.['productIds'] || []) {
      const product = await this.productService.findById(productId);
      // If product does not exists, throw an error
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found.`);
      }
      // Check if product is already associated with the menu
      const existingMenuProduct = await this.prisma.menuProduct.findFirst({
        where: {
          menuId: menu.id,
          productId: product.id,
        },
      });
      // If product is already associated with the menu, throw an error
      if (existingMenuProduct) {
        throw new BadRequestException(
          `Product with ID ${product.id} is already associated with the menu.`,
        );
      }
      // Create the menu product
      const menuProduct = await this.prisma.menuProduct.create({
        data: {
          menuId: menu.id,
          productId: product.id,
        },
      });
      // Add menu product to array
      menuProducts.push(menuProduct);
    }
    // Return all menu products created with the menuId and productId
    return menuProducts;
  }
  // Find menu by id with products
  async listProductsInMenu(menuId: string): Promise<MenuProductEntity[]> {
    // Check if menu exists
    await this.menuService.findById(menuId);

    // Find all menu products with menuId and productId
    const menuProducts = await this.prisma.menuProduct.findMany({
      where: { menuId: menuId },
      include: {
        product: true,
        menu: true,
      },
    });

    // If menu length is 0, throw an error
    if (menuProducts?.length === 0) {
      throw new NotFoundException('No products found for the given menu ID.');
    }

    return menuProducts;
  }
  // Remove products from menu
  async removeProductsFromMenu(
    menuId: string,
    productIds: ProductsDTO,
  ): Promise<{ message: string }> {
    // Check if menu exists
    const menu = await this.menuService.findById(menuId);

    for (const productId of productIds['productIds']) {
      // Check if product exists
      const menuProduct = await this.prisma.menuProduct.findFirst({
        where: { menuId: menu.id, productId },
      });
      // If menu product exists, delete it
      if (menuProduct) {
        await this.prisma.menuProduct.delete({
          where: { id: menuProduct.id },
        });
      } else {
        // If product does not exists in the menu, throw an error
        throw new NotFoundException(
          `Product with ID ${productId} not found in the menu.`,
        );
      }
    }
    // Return a message
    return { message: 'Products removed from the menu successfully!' };
  }

  // Remove all products from menu
  async removeAllProductsFromMenu(
    menuId: string,
  ): Promise<{ message: string }> {
    // Check if menu exists
    const menu = await this.menuService.findByIdWithProducts(menuId);

    if (menu['menuProducts']?.length === 0) {
      return { message: 'No products to remove from the menu.' };
    }

    // Delete all products from menu
    await this.prisma.menuProduct.deleteMany({
      where: { menuId: menu.id },
    });

    // Return a message
    return { message: 'All products removed successfully!' };
  }
}
