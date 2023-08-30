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
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dtos/index.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CuidPipe } from '../../pipes/cuid.pipe';
import { ProductEntity } from './entities/product.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', {}))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProductDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'Success - The product has been successfully created.',
  })
  @ApiBadRequestResponse({
    description:
      'Bad Request - Product exists or Price invalid or Image invalid!',
  })
  @ApiNotFoundResponse({ description: 'Not Found - Category not found!' })
  @ApiOperation({ summary: 'Create a product.' })
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/',
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,
    @Body() data: CreateProductDTO,
  ): Promise<ProductEntity> {
    return await this.productService.create(image, data);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Success - All products!' })
  @ApiOperation({ summary: 'List all products.' })
  async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  @Get('category')
  @ApiResponse({
    status: 200,
    description: 'Success - All products with category!',
  })
  @ApiOperation({ summary: 'List all products with category.' })
  async findAllWithCategory(): Promise<ProductEntity[]> {
    return await this.productService.findAllWithCategory();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success - Find product by id!' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid CUID format or Product not found.',
  })
  @ApiOperation({ summary: 'Find product by id.' })
  async findById(
    @Param('id', new CuidPipe()) id: string,
  ): Promise<ProductEntity> {
    return await this.productService.findById(id);
  }

  @Get(':id/category')
  @ApiResponse({
    status: 200,
    description: 'Success - Find product by id with category!',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid CUID format.',
  })
  @ApiNotFoundResponse({ description: 'Not Found - Id not found!' })
  @ApiOperation({ summary: 'Find product by id with category.' })
  async findByIdWithCategory(
    @Param('id', new CuidPipe()) id: string,
  ): Promise<ProductEntity> {
    return await this.productService.findByIdWithCategory(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateProductDTO,
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Success - Update with success!' })
  @ApiBadRequestResponse({
    description:
      'Bad Request - Invalid CUID format or Product not found or Image invalid!',
  })
  @ApiNotFoundResponse({ description: 'Not Found - Category not found!' })
  @ApiOperation({ summary: 'Update product by id.' })
  async update(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/',
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,
    @Param('id', new CuidPipe()) id: string,
    @Body() data: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return await this.productService.update(id, data, image);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Success - Delete with success!' })
  @ApiNotFoundResponse({
    description: 'Not Found - ProductId does not exists!',
  })
  @ApiOperation({ summary: 'Delete product by id.' })
  async delete(
    @Param('id', new CuidPipe()) id: string,
  ): Promise<{ message: string }> {
    return await this.productService.delete(id);
  }
}
