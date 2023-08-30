import { Module } from '@nestjs/common';
import { MenuProductService } from './menu-product.service';
import { MenuProductController } from './menu-product.controller';
import { PrismaService } from '../../database/prisma.service';
import { MenuService } from '../menu/menu.service';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';

@Module({
  controllers: [MenuProductController],
  providers: [
    MenuProductService,
    PrismaService,
    MenuService,
    ProductService,
    CategoryService,
  ],
})
export class MenuProductModule {}
