import { MenuEntity } from '../../menu/entities/menu.entity';
import { ProductEntity } from '../../product/entities/product.entity';

export interface MenuProductEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  menuId: MenuEntity['id'];
  productId: ProductEntity['id'];
}
