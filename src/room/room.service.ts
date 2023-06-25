import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { BatchService } from './../batch/batch.service';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private batch: BatchService,
  ) {}

  async index() {
    const hour = new Date();
    const Nhour = hour.getHours();

    const dateNow =
      Date.now() - Nhour * 60 * 60 * 1000;
    const date = new Date(dateNow).toISOString();

    const getBatch =
      await this.batch.getActiveBatch(Nhour);

    if (getBatch.length < 1) {
      throw new BadRequestException(
        'Antrian tiket belum dibuka atau sudah selesai',
      );
    }

    const rooms = await this.prisma.room.findMany(
      {
        include: {
          tikets: {
            where: {
              AND: [
                {
                  batchId: {
                    equals: getBatch[0].id,
                  },
                },
                {
                  isIdle: {
                    equals: false,
                  },
                },
                {
                  createdAt: {
                    gte: date,
                  },
                },
              ],
            },
            orderBy: {
              noUrutan: 'asc',
            },
          },
        },
      },
    );

    return rooms;
  }

  async listRooms() {
    const rooms = await this.prisma.room.findMany(
      {
        orderBy: {
          id: 'asc',
        },
      },
    );

    return rooms;
  }

  async show(roomId: number, batchId: number) {
    const hour = new Date();
    const Nhour = hour.getHours();

    const dateNow =
      Date.now() - Nhour * 60 * 60 * 1000;
    const date = new Date(dateNow).toISOString();

    const getBatch =
      await this.batch.getActiveBatch(Nhour);

    if (getBatch.length < 1) {
      throw new BadRequestException(
        'Antrian tiket belum dibuka atau sudah selesai',
      );
    }

    const room = await this.prisma.room.findFirst(
      {
        where: {
          id: roomId,
        },
        include: {
          tikets: {
            where: {
              AND: [
                {
                  batchId: {
                    equals: getBatch[0].id,
                  },
                },
                {
                  isIdle: {
                    equals: false,
                  },
                },
                {
                  createdAt: {
                    gte: date,
                  },
                },
              ],
            },
            orderBy: {
              noUrutan: 'asc',
            },
          },
        },
      },
    );

    return room;
  }

  async createRoom(dto: CreateRoomDto) {
    const newRoom = await this.prisma.room.create(
      {
        data: {
          roomName: dto.roomName,
          color: dto.color,
        },
      },
    );

    return newRoom;
  }
}
