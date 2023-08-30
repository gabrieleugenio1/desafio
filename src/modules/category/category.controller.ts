import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ReturnCategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  ReturnCategoryWithProductsDTO,
} from './dtos/index.dto';
import { CategoryEntity } from './entities/category.entity';
import { CuidPipe } from '../../pipes/cuid.pipe';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger/dist';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'Created - The category has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request - Category exists!' })
  @ApiOperation({ summary: 'Create a category.' })
  async create(@Body() data: CreateCategoryDTO): Promise<CategoryEntity> {
    return await this.categoryService.create(data);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Success - All categories!' })
  @ApiOperation({ summary: 'List all categories.' })
  async findAll(): Promise<ReturnCategoryDTO[]> {
    return (await this.categoryService.findAll()).map(
      (category) => new ReturnCategoryDTO(category),
    );
  }

  @Get('products')
  @ApiResponse({
    status: 200,
    description: 'Success - All categories with Products!',
  })
  @ApiOperation({ summary: 'List all categories with Products.' })
  async findAllWithProduct(): Promise<ReturnCategoryWithProductsDTO[]> {
    return (await this.categoryService.findAllWithProducts()).map(
      (category) => new ReturnCategoryWithProductsDTO(category),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Success - Find category by id.' })
  @ApiResponse({ status: 200, description: 'Found by id!' })
  @ApiNotFoundResponse({ description: 'Id not found!' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid CUID format.',
  })
  async findById(
    @Param('id', new CuidPipe()) id: string,
  ): Promise<CategoryEntity> {
    return await this.categoryService.findById(id);
  }

  @Get(':id/products')
  @ApiResponse({
    status: 200,
    description: 'Success - Find category by id with products!',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid CUID format.',
  })
  @ApiNotFoundResponse({ description: 'Not Found - Id not found!' })
  @ApiOperation({ summary: 'Find category by id with products.' })
  async findByIdWithProducts(
    @Param('id', new CuidPipe()) id: string,
  ): Promise<CategoryEntity> {
    return await this.categoryService.findByIdWithProducts(id);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Success - Found by id!' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid CUID format.',
  })
  @ApiNotFoundResponse({
    description:
      'Not Found - CategoryId does not exists or CategoryName exists!',
  })
  @ApiOperation({ summary: 'Update category by id.' })
  async update(
    @Param('id', new CuidPipe()) id: string,
    @Body() data: UpdateCategoryDTO,
  ): Promise<CategoryEntity> {
    return await this.categoryService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Success - Delete with success!' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid CUID format or Category has products.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found - CategoryId does not exists!',
  })
  @ApiOperation({ summary: 'Delete category by id.' })
  async delete(
    @Param('id', new CuidPipe()) id: string,
  ): Promise<{ message: string }> {
    return await this.categoryService.delete(id);
  }
}
