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

    const updateTask =
      await this.prisma.task.update({
        where: {
          antrianId: antrianId,
        },
        data: {
          ...dto,
        },
      });

    return updateTask;
  }
}
