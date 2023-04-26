import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto) {
    const task = await this.prisma.task.findFirst(
      {
        where: {
          antrianId: dto.antrianId,
        },
      },
    );

    if (task) {
      return task;
    }

    const newTask = await this.prisma.task.create(
      {
        data: {
          group: dto.group,
          petugasId: dto.petugasId,
          counterId: dto.counterId,
          antrianId: dto.antrianId,
        },
      },
    );
    return newTask;
  }

  async updateTask(
    antrianId: number,
    dto: UpdateTaskDto,
  ) {
    const task = this.prisma.task.findFirst({
      where: {
        antrianId: antrianId,
      },
    });

    if (!task) {
      throw new BadRequestException(
        'Something wrong with the request',
      );
    }

    // const updateTask =
    //   await this.prisma.task.update({
    //     where: {
    //       antrianId: antrianId,
    //     },
    //     data: {
    //       ...dto,
    //     },
    //   });

    // return updateTask;
  }

  async summaryTask(periode: string) {
    const now = new Date();

    let qDate = null;
    if (periode === 'harian') {
      qDate = new Date(
        now.getTime() - 2 * 24 * 60 * 60 * 1000,
      );
    } else if (periode === 'mingguan') {
      qDate = new Date(
        now.getTime() - 8 * 24 * 60 * 60 * 1000,
      );
    } else {
      qDate = new Date(
        now.getTime() - 31 * 24 * 60 * 60 * 1000,
      );
    }

    const counter =
      await this.prisma.counter.findMany({
        select: {
          id: true,
          nomorCounter: true,
          menu: {
            select: {
              label: true,
            },
          },
        },
      });

    const data = await Promise.all(
      counter.map(async (item, idx) => {
        return {
          id: ++idx,
          loket: item.nomorCounter,
          group: item.menu.label,
          jumlahAntrian: await this.queryTask(
            item.id,
            qDate,
          ).then((res) => res._count),
          jumlahSelesai:
            await this.queryStatusTask(
              item.id,
              qDate,
              4,
            ).then((res) => res._count),
          jumlahTertunda:
            await this.queryStatusTask(
              item.id,
              qDate,
              3,
            ).then((res) => res._count),
          waktuPenanganan:
            await this.queryResponseTime(item.id),
        };
      }),
    );

    return data;
  }

  queryTask = async (counterId, date) => {
    const result =
      await this.prisma.task.aggregate({
        where: {
          counterId: counterId,
          createdAt: {
            gte: date,
          },
        },
        _count: true,
      });
    return result;
  };

  queryStatusTask = async (
    counterId: number,
    date: string,
    status: number,
  ) => {
    const result =
      await this.prisma.task.aggregate({
        where: {
          counterId: counterId,
          createdAt: {
            gte: date,
          },
          antrian: {
            statusAntrian: status,
          },
        },
        _count: true,
      });
    return result;
  };

  queryResponseTime = async (
    counterId: number,
  ) => {
    const datas = await this.prisma.task.findMany(
      {
        where: {
          counterId,
        },
        select: {
          antrian: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    );

    let totalSec = 0;
    let jmlData = 0;
    let diffMins = 0;

    datas.map((item) => {
      const create = new Date(
        item.antrian.createdAt,
      );
      const update = new Date(
        item.antrian.updatedAt,
      );
      const diffTime = Math.abs(
        update.getSeconds() - create.getSeconds(),
      );
      totalSec = totalSec + diffTime;
      jmlData++;
      return diffTime;
    });
    const avgSec = totalSec / jmlData;
    diffMins = avgSec / 60;
    return diffMins ? diffMins.toFixed(2) : 0;
  };
}
