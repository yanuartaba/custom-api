import { HttpCode } from '@nestjs/common/decorators';
import {
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CreateRiwayatDto } from './dto/create-riwayat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRiwayatDto } from './dto/update-riwayat.dto';

@Injectable()
export class RiwayatService {
  constructor(private prisma: PrismaService) {}

  async createRiwayat(dto: CreateRiwayatDto) {
    const newRiwayat =
      await this.prisma.riwayat.create({
        data: {
          ...dto,
        },
      });

    return newRiwayat;
  }

  async updateRiwayat(
    roomId: number,
    tiketId: number,
    dtoUpdate: UpdateRiwayatDto,
  ) {
    const riwayat =
      await this.prisma.riwayat.findFirst({
        where: {
          AND: [
            {
              roomId: {
                equals: roomId,
              },
            },
            {
              tiketId: {
                equals: tiketId,
              },
            },
          ],
        },
      });

    if (!riwayat)
      throw new NotFoundException(
        'Riwayat not found',
      );

    const updateData =
      await this.prisma.riwayat.update({
        where: {
          id: riwayat.id,
        },
        data: {
          ...dtoUpdate,
        },
      });

    return updateData;
  }

  async deleteRiwayat(
    roomId: number,
    tiketId: number,
  ) {
    const riwayat =
      await this.prisma.riwayat.findFirst({
        where: {
          AND: [
            {
              roomId: {
                equals: roomId,
              },
            },
            {
              tiketId: {
                equals: tiketId,
              },
            },
          ],
        },
      });

    if (!riwayat)
      throw new NotFoundException(
        'Riwayat not found',
      );

    return await this.prisma.riwayat.delete({
      where: {
        id: riwayat.id,
      },
    });
  }
}
