import { BadRequestException } from '@nestjs/common/exceptions';
import { EditMenuDto } from './dto/edit-menu.dto';
import { CreateMenuDto } from './dto/create-menut.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async index() {
    const menus = await this.prisma.menu.findMany(
      {
        orderBy: [{ codeGroup: 'asc' }],
        include: {
          antrians: {
            where: { statusAntrian: 1 },
            select: {
              id: true,
            },
          },
          _count: {
            select: {
              antrians: true,
            },
          },
        },
      },
    );

    const interfaceMenu = menus.map((menu) => {
      const jumlahAntrian = menu.antrians.length;
      return { ...menu, jumlahAntrian };
    });

    return interfaceMenu;
  }

  async create(dto: CreateMenuDto) {
    const cekCode =
      await this.prisma.menu.findFirst({
        where: {
          codeGroup: dto.codeGroup,
        },
      });

    if (cekCode) {
      throw new BadRequestException(
        'Code group already used',
      );
    }

    const newMenu = await this.prisma.menu.create(
      {
        data: {
          label: dto.label,
          codeGroup: dto.codeGroup,
          urlParam: dto.urlParam,
          description: dto.description,
          image: dto.image,
        },
      },
    );

    return newMenu;
  }

  async update(menuId: number, dto: EditMenuDto) {
    const menu = await this.prisma.menu.findFirst(
      {
        where: {
          id: menuId,
        },
      },
    );

    if (!menu) {
      throw new NotFoundException(
        'Menu not found',
      );
    }

    const updateMenu =
      await this.prisma.menu.update({
        where: {
          id: menuId,
        },
        data: {
          ...dto,
        },
      });

    return updateMenu;
  }

  async delete(menuId: number) {
    const menu = await this.prisma.menu.findFirst(
      {
        where: {
          id: menuId,
        },
      },
    );

    if (!menu) {
      throw new NotFoundException(
        'Menu not found',
      );
    }

    return this.prisma.menu.delete({
      where: {
        id: menuId,
      },
    });
  }
}
