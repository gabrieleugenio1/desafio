import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Create a new category
  async create(data: CategoryEntity): Promise<CategoryEntity> {
    // Check if category exists
    const categoryExists = await this.prisma.category.findFirst({
      where: { name: data.name },
    });
    // If category exists, throw an error
    if (categoryExists) {
      throw new BadRequestException('Category exists!');
    }
    // Create the category
    const category = await this.prisma.category.create({ data });
    return category;
  }

  // Find all categories
  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  // Find all categories with products
  async findAllWithProducts(): Promise<CategoryEntity[]> {
    const categoriesWithProducts = await this.prisma.category.findMany({
      include: {
        products: {
          orderBy: {
            name: 'asc', // Sort products by name
          },
        },
      },
      orderBy: {
        name: 'asc', // Sort categories by name
      },
    });
    return categoriesWithProducts;
  }

  // Find category by id
  async findById(id: string): Promise<CategoryEntity> {
    // Check if category exists
    const category = await this.prisma.category.findFirst({
      where: { id: id },
    });
    // If category does not exists, throw an error
    if (!category) {
      throw new NotFoundException('CategoryId does not exists!');
    }

    return category;
  }

  // Find category by id with products
  async findByIdWithProducts(id: string): Promise<CategoryEntity> {
    const categoryWithProducts = await this.prisma.category.findFirst({
      where: { id: id },
      include: {
        products: true, // Include all products
      },
    });
    // If category does not exists, throw an error
    if (!categoryWithProducts) {
      throw new NotFoundException('CategoryId does not exists!');
    }
    return categoryWithProducts;
  }

  // Update category by id
  async update(id: string, data: CategoryEntity): Promise<CategoryEntity> {
    // Check if category exists by id
    const categoryExistsId = await this.prisma.category.findFirst({
      where: { id: id },
    });

    // Check if category exists
    const categoryExists = await this.prisma.category.findFirst({
      where: { name: data.name },
    });

    // If category does not exists or category name exists, throw an error
    if (!categoryExistsId || categoryExists) {
      throw new BadRequestException(
        'CategoryId does not exists or CategoryName exists!',
      );
    }

    // Update the category
    const category = await this.prisma.category.update({
      where: { id },
      data,
    });

    return category;
  }

  // Delete category by id
  async delete(id: string): Promise<{ message: string }> {
    // Check if category exists by id
    const categoryExistsId = await this.prisma.category.findFirst({
      where: { id: id },
    });
    // If category does not exists, throw an error
    if (!categoryExistsId) {
      throw new NotFoundException('Category does not exists!');
    }
    // Check if category has products
    const categoryWithProducts = await this.prisma.category.findFirst({
      where: { id: id },
      include: {
        products: true, // Include all products
      },
    });
    // If category has products, throw an error
    if (categoryWithProducts.products?.length > 0) {
      throw new BadRequestException(
        'Category has products, delete the products first!',
      );
    }
    // Delete the category
    await this.prisma.category.delete({
      where: { id },
    });
    // Return a message
    return { message: 'Category removed successfully!' };
  }
}
