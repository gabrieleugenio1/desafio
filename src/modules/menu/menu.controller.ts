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
import { MenuService } from './menu.service';
import { createMenuDTO, updateMenuDTO } from './dtos/index.dto';
import { MenuEntity, ShiftMenu } from './entities/menu.entity';
import { CuidPipe } from '../../pipes/cuid.pipe';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiQuery({ name: 'Turno', enum: ShiftMenu })
  @ApiResponse({ status: 201, description: 'Created - The menu has been successfully created.'})
  @ApiBadRequestResponse({ description: 'Bad Request - Only two insertions are allowed or alried created the shift!'})
  @ApiOperation({ summary: 'Create a menu for DIURNO, NOTURNO, or BOTH shifts.'})
  async create(@Body() data: createMenuDTO): Promise<MenuEntity> {
    return await this.menuService.create(data);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Success - All menus!'})
  @ApiOperation({ summary: 'List all menus.'})
  async findAll() {
    return await this.menuService.findAll();
  }

  @Get('shift')
  @ApiNotFoundResponse({ description: 'Not Found - Shift does not exists!'})
  @ApiResponse({ status: 200, description: 'Success - All menus by actually shift!'})
  @ApiOperation({ summary: 'Get menu for the currently active shift.' })
  async findByShift() {
    return await this.menuService.findByShift();
  }

  @Get('products')
  @ApiResponse({ status: 200, description: 'Success - All menus with products!'})
  @ApiOperation({ summary: 'List all menus with products.'})
  async findAllWithProducts() {
    return await this.menuService.findAllWithProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find menu by id.' })
  @ApiResponse({ status: 200, description: 'Success - Find menu by id.' })
  @ApiNotFoundResponse({ description: 'Not Found - Id not found!' })
  async findByid(@Param('id', new CuidPipe()) id: string) {
    return await this.menuService.findById(id);
  }

  @Get(':id/products')
  @ApiResponse({ status: 200, description: 'Success - Find menu by id with products!'})
  @ApiNotFoundResponse({ description: 'Not Found - Id not found!'})
  @ApiOperation({ summary: 'Find menu by id with products.'})
  async findByidWithProducts(@Param('id', new CuidPipe()) id: string) {
    return await this.menuService.findByIdWithProducts(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiQuery({ name: 'Turno', enum: ShiftMenu })
  @ApiResponse({ status: 200, description: 'Success - Update with success!'})
  @ApiBadRequestResponse({ description: 'Bad Request - MenuId does not exists or MenuShift exists'} )
  @ApiOperation({ summary: 'Update menu by id.'})
  async update(@Param('id', new CuidPipe()) id: string, @Body() data: updateMenuDTO) {
    return await this.menuService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Success - Delete with success!'})
  @ApiNotFoundResponse({ description: 'Not Found - MenuId does not exists!'})
  @ApiOperation({ summary: 'Delete menu by id.'})
  async delete(@Param('id', new CuidPipe()) id: string) {
    return await this.menuService.delete(id);
  }
}
