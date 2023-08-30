import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MenuEntity, ShiftMenu } from './entities/menu.entity';
import { createMenuDTO, updateMenuDTO } from './dtos/index.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Create a new menu
  async create(data: createMenuDTO): Promise<MenuEntity> {
    // Check if there are already two menus.
    const count = await this.prisma.menu.count();
    // If there are already two menus, throw an error.
    if (count >= 2) {
      throw new BadRequestException('Only two insertions are allowed.');
    }
    // Check if menu shift already exists.
    const existingShiftMenu = await this.prisma.menu.findFirst({
      where: { shift: data.shift },
    });

    // If menu shift already exists, throw an error.
    if (existingShiftMenu) {
      throw new BadRequestException(
        `Menu with shift '${existingShiftMenu.shift}' already exists.`,
      );
    }
    // Create the menu
    const menu = await this.prisma.menu.create({ data });

    return menu;
  }

  // Find all menus
  async findAll(): Promise<MenuEntity[]> {
    const menu = await this.prisma.menu.findMany();
    return menu;
  }

  // Find all menus with products
  async findAllWithProducts(): Promise<MenuEntity[]> {
    const menu = await this.prisma.menu.findMany({
      include: {
        menuProducts: {
          select: {
            // Select all fields except id, menuId, productId
            id: false,
            menuId: false,
            productId: false,
            product: true,
          },
        },
      },
    });

    return menu;
  }

  // Find menu by id
  async findById(id: string): Promise<MenuEntity> {
    // Check if menu exists
    const menu = await this.prisma.menu.findFirst({
      where: { id: id },
    });
    // If menu does not exists, throw an error
    if (!menu) {
      throw new NotFoundException('MenuId does not exists!');
    }

    return menu;
  }

  // Find menu by id with products
  async findByIdWithProducts(id: string): Promise<MenuEntity> {
    // Check if menu exists
    const menu = await this.prisma.menu.findFirst({
      where: { id: id },
      include: {
        menuProducts: {
          select: {
            id: false,
            menuId: false,
            productId: false,
            product: {
              select: {
                // Select all fields except createdAt, updatedAt
                id: true,
                name: true,
                price: true,
                description: true,
                image: true,
                category: {
                  select: {
                    // Select all fields except createdAt, updatedAt
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // If menu does not exists, throw an error
    if (!menu) {
      throw new NotFoundException('MenuId does not exist!');
    }

    return menu;
  }

  // Find menu by shift
  async findByShift(): Promise<MenuEntity> {
    // Get the current hour
    const now = new Date();
    const currentHour = now.getHours();
    let shift: ShiftMenu;

    // Check if the current hour is between 6 and 18
    if (currentHour >= 6 && currentHour < 18) {
      shift = ShiftMenu.DIURNO;
    } else {
      shift = ShiftMenu.NOTURNO;
    }

    // Find menu by shift
    const menu = await this.prisma.menu.findFirst({
      where: { shift: shift },
      include: {
        // Include Products
        menuProducts: {
          // Select all fields except id, menuId, productId
          select: {
            id: false,
            menuId: false,
            productId: false,
            product: {
              // Select all fields
              include: {
                // Select all fields
                category: true,
              },
            },
          },
        },
      },
    });

    // If menu does not exists, throw an error
    if (!menu) {
      throw new NotFoundException('The menu with this shift does not exists!');
    }

    return menu;
  }

  // Update menu by id
  async update(id: string, data: updateMenuDTO): Promise<MenuEntity> {
    // Check if menu exists by id
    const menuExistsId = await this.prisma.menu.findFirst({
      where: { id: id },
    });

    // If menu does not exists, throw an error
    if (!menuExistsId) {
      throw new BadRequestException('MenuId does not exist.');
    }

    // Check if menu shift already exists.
    const existingMenuWithShift = await this.prisma.menu.findFirst({
      where: { shift: data.shift },
    });

    // If menu shift already exists or menu shift id is different from the actual menu id, throw an error.
    if (existingMenuWithShift && existingMenuWithShift.id !== id) {
      throw new BadRequestException('A menu with this shift already exists.');
    }
    // Update the menu
    const menu = await this.prisma.menu.update({
      where: { id },
      data: {
        shift: data.shift,
      },
    });

    return menu;
  }

  // Delete menu by id
  async delete(id: string): Promise<{ message: string }> {
    // Check if menu exists by id
    const menuExistsId = await this.prisma.menu.findFirst({
      where: { id: id },
    });
    // If menu does not exists, throw an error
    if (!menuExistsId) {
      throw new NotFoundException('Menu does not exists!');
    }
    // Delete the menu
    await this.prisma.menu.delete({
      where: { id },
    });
    // Return a message
    return { message: 'Menu removed successfully!' };
  }
}
