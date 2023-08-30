import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { saveImage } from '../../utils/image.utils';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}

  // Create a new product
  async create(
    image: Express.Multer.File | undefined,
    data: CreateProductDTO,
  ): Promise<ProductEntity> {
    // Check if category exists
    const categoryExists = await this.categoryService.findById(data.categoryId);
    // If category does not exists, throw an error
    if (!categoryExists) {
      throw new NotFoundException('Category not found.');
    }
    // Check if product exists
    const productExists = await this.prisma.product.findFirst({
      where: { name: data.name },
    });
    // If product name exists, throw an error
    if (productExists) {
      throw new BadRequestException('Product exists!');
    }
    // Check if price is valid
    if (isNaN(Number(data.price)) || Number(data.price) < 0) {
      throw new BadRequestException('Price is invalid!');
    }
    // Check if have a image
    if (image) {
      // Check if image is valid and save
      const imagePath = await saveImage(image);
      // Add image path to data
      data.image = imagePath;
    }

    // Create the product
    const product = await this.prisma.product.create({
      data: {
        ...data,
        price: Number(data.price), // Convert price to number
        image: data?.image, // Add image path
      },
    });

    return product;
  }

  // Find all products
  async findAll(): Promise<ProductEntity[]> {
    // Find all products and sort by name
    const product = await this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return product;
  }

  // Find all products with category
  async findAllWithCategory(): Promise<ProductEntity[]> {
    // Find all products with category and sort by category name
    const product = await this.prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        category: {
          name: 'asc',
        },
      },
    });
    return product;
  }

  // Find product by id
  async findById(id: string): Promise<ProductEntity> {
    // Check if product exists
    const product = await this.prisma.product.findFirst({
      where: { id: id },
    });
    // If product does not exists, throw an error
    if (!product) {
      throw new NotFoundException('ProductId does not exists!');
    }

    return product;
  }

  // Find product by id with category
  async findByIdWithCategory(id: string): Promise<ProductEntity> {
    // Check if product exists
    const product = await this.prisma.product.findFirst({
      where: { id: id },
      include: {
        // Include category
        category: true,
      },
    });
    // If product does not exists, throw an error
    if (!product) {
      throw new NotFoundException('ProductId does not exists!');
    }

    return product;
  }

  // Update product by id
  async update(
    id: string,
    data: any,
    image?: Express.Multer.File,
  ): Promise<ProductEntity> {
    // Check if product exists by id
    const productExistsId = await this.prisma.product.findFirst({
      where: { id: id },
    });

    // If product does not exists, throw an error
    if (!productExistsId) {
      throw new BadRequestException('ProductId does not exist!');
    }

    // Check if have category id in data for update to a new category
    if (data.categoryId) {
      const categoryExists = await this.categoryService.findById(
        data.categoryId,
      );

      // If category does not exists, throw an error
      if (!categoryExists) {
        throw new NotFoundException('Category not found.');
      }
    }

    // Check if have a image
    if (image) {
      // Check if image is valid and save
      const imagePath = await saveImage(image);
      // Add image path to data
      data.image = imagePath;
    }
    // Check if have a price
    if (data.price) {
      // Check if price is valid
      if (isNaN(Number(data.price)) || Number(data.price) < 0) {
        throw new BadRequestException('Price is invalid!');
      }
    }
    // Update the product
    const product = await this.prisma.product.update({
      where: { id },
      data,
    });

    return product;
  }

  // Delete product by id
  async delete(id: string): Promise<{ message: string }> {
    // Check if product exists by id
    const productExistsId = await this.prisma.product.findFirst({
      where: { id: id },
    });
    // If product does not exists, throw an error
    if (!productExistsId) {
      throw new NotFoundException('ProductId not exists!');
    }
    // Delete the product
    await this.prisma.product.delete({
      where: { id },
    });
    // Return a message
    return { message: 'Product removed successfully!' };
  }
}
