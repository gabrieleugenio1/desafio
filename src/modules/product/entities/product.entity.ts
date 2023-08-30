import { CategoryEntity } from '../../category/entities/category.entity';

export interface ProductEntity {
  id?: string;
  name: string;
  price: number;
  image?: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: CategoryEntity['id'];
}
