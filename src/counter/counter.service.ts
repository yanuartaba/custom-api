import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { EditCounterDto } from './dto/edit-counter.dto';
import { CreateCounterDto } from './dto/create-counter.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  constructor(private prisma: PrismaService) {}

  async getAllCounter() {
    // const setLimit = limit ? limit : 10;
    const counters =
      await this.prisma.counter.findMany({
        // limit: setLimit,
        include: {
          menu: true,
        },
        orderBy: [
          {
            group: 'asc',
          },
        ],
      });

    return counters;
  }

  async createCounter(dto: CreateCounterDto) {
    const existGroup =
      await this.prisma.menu.findFirst({
        where: {
          codeGroup: dto.group,
        },
      });

    if (!existGroup) {
      throw new BadRequestException(
        'Group does not exist',
      );
    }

    const existField =
      await this.prisma.counter.findFirst({
        where: {
          nomorCounter: dto.nomorCounter,
        },
      });

    if (existField) {
      throw new BadRequestException(
        'Nomor counter telah ada',
      );
    }

    const newCounter =
      await this.prisma.counter.create({
        data: {
          nomorCounter: dto.nomorCounter,
          group: dto.group,
        },
      });
    return newCounter;
  }

  async updateCounter(
    counterId: number,
    dto: EditCounterDto,
  ) {
    const counterExist =
      await this.prisma.counter.findFirst({
        where: {
          id: counterId,
        },
      });

    if (!counterExist) {
      throw new NotFoundException(
        'Counter does not exist',
      );
    }

    const updateCounter =
      await this.prisma.counter.update({
        where: {
          id: counterId,
        },
        data: {
          ...dto,
        },
      });

    return updateCounter;
  }

  async deleteCounter(counterId: number) {
    const counter =
      await this.prisma.counter.findFirst({
        where: {
          id: counterId,
        },
      });
    if (!counter) {
      throw new NotFoundException(
        'Counter not found',
      );
    }

    return this.prisma.counter.delete({
      where: {
        id: counterId,
      },
    });
  }
}
