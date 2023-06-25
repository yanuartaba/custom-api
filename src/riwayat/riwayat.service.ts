import { HttpCode } from '@nestjs/common/decorators';
import {
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CreateRiwayatDto } from './dto/create-riwayat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    riwayatId: number,
    dto: CreateRiwayatDto,
  ) {
    const riwayat =
      await this.prisma.riwayat.findFirst({
        where: {
          id: riwayatId,
        },
      });

    if (!riwayat)
      throw new NotFoundException(
        'Riwayat not found',
      );

    const updateData =
      await this.prisma.riwayat.update({
        where: {
          id: riwayatId,
        },
        data: {
          ...dto,
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
