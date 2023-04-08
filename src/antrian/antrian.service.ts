import { BadRequestException } from '@nestjs/common/exceptions';
import { CreateAntrianDto } from './dto/create-antrian.dto';
import { EditAntrianDto } from './dto/edit-antrian.dto';
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
    statusAntrian: number,
    listAntrian: boolean,
  ) {
    const dateNow =
      Date.now() - 24 * 60 * 60 * 1000;
    const date = new Date(dateNow).toISOString();
    // console.log(date);

    if (listAntrian === true) {
      const allAntrian =
        await this.prisma.antrian.findMany({
          where: {
            AND: [
              { group: group },
              {
                statusAntrian: {
                  lte: statusAntrian,
                },
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
              nomor: 'asc',
            },
          ],
        });
      return allAntrian;
    } else {
      const allAntrian =
        await this.prisma.antrian.findMany({
          where: {
            AND: [
              { group: group },
              { statusAntrian: statusAntrian },
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
      nomorAntrian = lastAntrian.nomorInt + 1;
    } else {
      nomorAntrian = 1;
    }

    let nomorStr = '';
    if (nomorAntrian < 10) {
      nomorStr = '00' + nomorAntrian.toString();
    } else if (
      nomorAntrian >= 10 &&
      nomorAntrian < 100
    ) {
      nomorStr = '0' + nomorAntrian.toString();
    } else {
      nomorStr = nomorAntrian.toString();
    }

    try {
      const newAntrian =
        await this.prisma.antrian.create({
          data: {
            nomor: nomorStr,
            nomorInt: nomorAntrian,
            group: dto.group,
          },
        });
      return newAntrian;
    } catch (error) {
      throw error;
    }
  }

  async updateAntrian(
    antrianId: number,
    dto: EditAntrianDto,
  ) {
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
          statusAntrian: dto.statusAntrian,
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
          statusAntrian: 3,
        },
      });

    return skipAntrian;
  }

  async statsAntrian(periode: string) {
    // const antrians = this.prisma.filters()

    return periode;
  }
}
