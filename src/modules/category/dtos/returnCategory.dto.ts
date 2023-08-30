export class ReturnCategoryDTO {
  id: string;
  name: string;

  constructor(categoryEntity: any) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
  }


};
