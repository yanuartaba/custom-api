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
    let date = null;
    const durasi = [];
    const now = new Date();
    if (periode === 'harian') {
      date = new Date(
        now.getTime() - 1 * 24 * 60 * 60 * 1000,
      );
      for (let i = 0; i < 7; i++) {
        const jam = new Date(
          now.getTime() - i * 60 * 60 * 1000,
        );
        durasi.push({
          index: i,
          durasi: 'harian',
          itensitas: 'jam',
          key: this.formatJam(jam),
          queryAfter: jam,
          queryBefore: durasi[i - 1]
            ? durasi[i - 1].queryAfter
            : new Date(now.getTime()),
        });
      }
    } else if (periode === 'mingguan') {
      date = new Date(
        now.getTime() - 31 * 24 * 60 * 60 * 1000,
      );
      for (let i = 0; i < 7; i++) {
        const tanggal = new Date(
          now.getTime() - i * 24 * 60 * 60 * 1000,
        );
        durasi.push({
          index: i,
          durasi: 'mingguan',
          itensitas: 'hari',
          key: this.formatTanggal(tanggal),
          queryAfter: tanggal,
          queryBefore: durasi[i - 1]
            ? durasi[i - 1].queryAfter
            : new Date(now.getTime()),
        });
      }
    } else if (periode === 'bulanan') {
      date = new Date(
        now.getTime() - 180 * 24 * 60 * 60 * 1000,
      );
      for (let i = 0; i < 31; i++) {
        const tanggal = new Date(
          now.getTime() - i * 24 * 60 * 60 * 1000,
        );
        durasi.push({
          index: i,
          durasi: 'bulanan',
          itensitas: 'hari',
          key: this.formatTanggal(tanggal),
          queryAfter: tanggal,
          queryBefore: durasi[i - 1]
            ? durasi[i - 1].queryAfter
            : new Date(now.getTime()),
        });
      }
    }

    const menus = await this.prisma.menu.findMany(
      {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          label: true,
          codeGroup: true,
        },
      },
    );

    const dataDetail = await Promise.all(
      menus.map(async (menu) => {
        const result = [];
        durasi.map(async (item) => {
          const x = await this.getSelectedSummary(
            item.queryAfter,
            item.queryBefore,
            menu.id,
          );
          const com = { ...item, ...x[0] };
          result.push(com);
          result
            .sort((a, b) => a.index - b.index)
            .reverse();
        });

        return { menu, result };
      }),
    );

    const totalAntrian = await this.getTotal(
      date,
    );

    const result = {
      totalAntrian,
      dataDetail,
    };

    return result;
  }

  getSelectedSummary = async (
    valAfter: string,
    valBefore: string,
    menuId: number,
  ) => {
    const result =
      await this.prisma.menu.findMany({
        where: {
          id: menuId,
        },
        select: {
          _count: {
            select: {
              antrians: {
                where: {
                  createdAt: {
                    gte: valAfter,
                    lte: valBefore,
                  },
                },
              },
            },
          },
        },
      });

    return result;
  };

  getSummary = async (
    valAfter: string,
    valBefore: string,
  ) => {
    const menus = await this.prisma.menu.findMany(
      {
        where: {
          isActive: true,
        },
        select: {
          label: true,
          codeGroup: true,
          _count: {
            select: {
              antrians: {
                where: {
                  createdAt: {
                    gte: valAfter,
                    lte: valBefore,
                  },
                },
              },
            },
          },
        },
      },
    );

    return menus ? menus : 0;
  };

  getTotal = async (valAfter: string) => {
    const menus = await this.prisma.menu.findMany(
      {
        select: {
          label: true,
          codeGroup: true,
          _count: {
            select: {
              antrians: {
                where: {
                  createdAt: {
                    gte: valAfter,
                  },
                },
              },
            },
          },
        },
      },
    );

    return menus;
  };

  monthMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };

  formatTanggal = (tgl) => {
    const tanggal = new Date(tgl);

    return `${tanggal.getDate()} - ${
      this.monthMap[tanggal.getMonth()]
    }`;
  };

  formatJam = (tgl) => {
    const tanggal = new Date(tgl);
    return `${tanggal.getHours()}:00`;
  };

  formatBulan = (tgl) => {
    const tanggal = new Date(tgl);
    return tanggal.getMonth() + 1;
  };

  formatTahun = (tgl) => {
    const tanggal = new Date(tgl);
    return tanggal.getFullYear();
  };

  // queryTanggal = (val) => {
  //   const now = new Date();
  //   return new Date(
  //     now.getTime() - val * 24 * 60 * 60 * 1000,
  //   );
  // };
}
