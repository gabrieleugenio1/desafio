import { ProductEntity } from "../../product/entities/product.entity";

export class ReturnCategoryWithProductsDTO {
  id: string;
  name: string;
  products?: ProductEntity[];

  constructor(categoryEntity: any) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.products = categoryEntity.products;
  }


};
