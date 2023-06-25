import { BatchService } from './../batch/batch.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditTiketDto } from './dto/edit-tiket.dto';

@Injectable()
export class TiketService {
  BatchService: any;
  constructor(
    private prisma: PrismaService,
    private batch: BatchService,
  ) {}

  async index() {
    const tikets =
      await this.prisma.tiket.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

    return tikets;
  }

  async getTiketById(tiketId: number) {
    const tiket =
      await this.prisma.tiket.findFirst({
        where: {
          id: tiketId,
        },
        include: {
          riwayats: {
            where: {
              tiketId: tiketId,
            },
            include: {
              room: true,
            },
          },
        },
      });

    const x = tiket.riwayats.map((e) => {
      return {
        nomor: tiket.nomor,
        tiketId: tiket.id,
        isIdle: tiket.isIdle,
        riwayatId: e.id,
        status: e.isProses,
        durasi: this.differentTime(
          e.createdAt.toString(),
          e.updatedAt.toString(),
        ),
        room: {
          roomName: e.room.roomName,
          color: e.room.color,
        },
      };
    });

    return x;
  }

  async listTiketByBatch() {
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

    const tikets =
      await this.prisma.tiket.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: date,
              },
            },
            {
              batchId: getBatch[0].id,
            },
          ],
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

    return tikets;
  }

  async createTiket() {
    const hour = new Date();
    const Nhour = hour.getHours();

    const dateNow =
      Date.now() - Nhour * 60 * 60 * 1000;
    const date = new Date(dateNow).toISOString();

    const getBatch =
      await this.batch.getActiveBatch(Nhour);

    if (getBatch.length < 1) {
      throw new BadRequestException(
        'Antrian tiket belum dibuka',
      );
    }

    const tiket =
      await this.prisma.tiket.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: date,
              },
            },
            {
              batchId: getBatch[0].id,
            },
          ],
        },
      });

    if (tiket.length >= getBatch[0].jumlah) {
      throw new BadRequestException(
        'Batas kuota telah terpenuhi',
      );
    }

    const newTiket =
      await this.prisma.tiket.create({
        data: {
          nomor: tiket.length + 1,
          isIdle: true,
          status: 1,
          batchId: getBatch[0].id,
        },
      });

    return newTiket;
  }

  async updateTiket(
    tiketId: number,
    dto: EditTiketDto,
  ) {
    const tiket =
      await this.prisma.tiket.findFirst({
        where: {
          id: tiketId,
        },
      });

    if (!tiket)
      throw new NotFoundException(
        'Tiket not found',
      );
    // return tiket.roomId;
    // if (tiket.status === 2)
    //   throw new BadRequestException(
    //     'Tiket masih dalam proses room',
    //   );

    const updateTiket =
      await this.prisma.tiket.update({
        where: {
          id: tiketId,
        },
        data: {
          ...dto,
        },
      });

    return updateTiket;
  }

  getUTCTime(dateTimeString: string): Date {
    const dateTime = new Date(dateTimeString);
    const dateTimeNumber = dateTime.getTime();
    const dateTimeOffset =
      dateTime.getTimezoneOffset() * 60000;
    const dateTimeUTC = new Date();
    dateTimeUTC.setTime(
      dateTimeNumber - dateTimeOffset,
    );

    return dateTimeUTC;
  }

  differentTime(
    createdAt: string,
    updatedAt: string,
  ) {
    const x = new Date(createdAt);
    const y = new Date(updatedAt);
    const difference = y.getTime() - x.getTime();

    return this.readableHuman(difference);
  }

  readableHuman(time: number) {
    if (time > 1000 * 60 * 60) {
      const x = time / 1000 / 60 / 60;
      return Math.ceil(x) + ' jam';
    } else if (time > 1000 * 60) {
      const x = time / 1000 / 60;
      return Math.ceil(x) + ' menit';
    } else {
      const x = time / 1000;
      return Math.ceil(x) + ' detik';
    }
  }
}
