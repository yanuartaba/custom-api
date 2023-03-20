import { BadRequestException } from '@nestjs/common/exceptions';
import { CreateAntrianDto } from './dto/create-antrian.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AntrianService {
  constructor(private prisma: PrismaService) {}

  async getAllAntrian(
    group: string,
    isFinish: boolean,
    isSkip: boolean,
  ) {
    const dateNow =
      Date.now() - 24 * 60 * 60 * 1000;
    const date = new Date(dateNow).toISOString();
    // console.log(date);
    const allAntrian =
      await this.prisma.antrian.findMany({
        where: {
          AND: [
            { group: group },
            { isFinish: isFinish },
            { isSkip: isSkip },
            {
              createdAt: {
                gte: date,
              },
            },
          ],
        },
        orderBy: [
          {
            nomor: 'asc',
          },
        ],
      });

    return allAntrian;
  }

  async createAntrian(dto: CreateAntrianDto) {
    const groupExist =
      await this.prisma.menu.findFirst({
        where: { codeGroup: dto.group },
      });

    if (!groupExist) {
      throw new BadRequestException(
        'Group not exist',
      );
    }

    const dateNow =
      Date.now() - 24 * 60 * 60 * 1000;
    const date = new Date(dateNow).toISOString();

    const lastAntrian =
      await this.prisma.antrian.findFirst({
        where: {
          AND: [
            {
              group: dto.group,
            },
            {
              createdAt: {
                gte: date,
              },
            },
          ],
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });

    let nomorAntrian = 0;
    if (lastAntrian) {
      nomorAntrian = lastAntrian.nomor + 1;
    } else {
      nomorAntrian = 1;
    }

    const newAntrian =
      await this.prisma.antrian.create({
        data: {
          nomor: nomorAntrian,
          group: dto.group,
        },
      });

    return newAntrian;
  }
  async updateAntrian(antrianId: number) {
    const antrianExist =
      await this.prisma.antrian.findFirst({
        where: {
          id: antrianId,
        },
      });

    if (!antrianExist) {
      throw new NotFoundException(
        'Antrian does not exist',
      );
    }

    const updateAntrian =
      this.prisma.antrian.update({
        where: {
          id: antrianId,
        },
        data: {
          isFinish: true,
          isSkip: false,
        },
      });

    return updateAntrian;
  }

  async skipAntrian(antrianId: number) {
    const antrianExist =
      await this.prisma.antrian.findFirst({
        where: {
          id: antrianId,
        },
      });

    if (!antrianExist) {
      throw new NotFoundException(
        'Antrian does not exist',
      );
    }

    const skipAntrian =
      this.prisma.antrian.update({
        where: {
          id: antrianId,
        },
        data: {
          isSkip: true,
        },
      });

    return skipAntrian;
  }
}
