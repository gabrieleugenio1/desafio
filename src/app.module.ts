import { Module } from '@nestjs/common';
import { MenuModule } from './modules/menu/menu.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { MenuProductModule } from './modules/menu-product/menu-product.module';

@Module({
  imports: [MenuModule, CategoryModule, ProductModule, MenuProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
