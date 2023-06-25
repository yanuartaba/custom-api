import { BadRequestException } from '@nestjs/common/exceptions';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { EditBatchDto } from './dto';
import { Expose } from 'class-transformer';

@Injectable()
export class BatchService {
  constructor(private prisma: PrismaService) {}

  async getBatchs() {
    const batchs =
      await this.prisma.batch.findMany({
        orderBy: {
          id: 'asc',
        },
      });

    const res = batchs.map((batch) => {
      return {
        id: batch.id,
        jumlah: batch.jumlah,
        waktuMulai: this.formatTime(
          batch.waktuMulai,
        ),
        waktuSelesai: this.formatTime(
          batch.waktuSelesai,
        ),
      };
    });

    return res;
  }

  async editBatchById(
    batchId: number,
    dto: EditBatchDto,
  ) {
    const batch =
      await this.prisma.batch.findFirst({
        where: {
          id: batchId,
        },
      });

    if (!batch)
      throw new NotFoundException(
        'Batch not found',
      );

    if (dto.waktuMulai || dto.waktuSelesai) {
      const mulai = dto.waktuMulai
        ? this.formatDateHour(dto.waktuMulai)
        : this.formatDateHour(batch.waktuMulai);
      const selesai = dto.waktuSelesai
        ? this.formatDateHour(dto.waktuSelesai)
        : this.formatDateHour(batch.waktuSelesai);

      if (mulai >= selesai) {
        throw new BadRequestException([
          'Perhatikan Waktu Batch',
        ]);
      }

      const batchs =
        await this.prisma.batch.findMany();

      const otherBatch = batchs.filter(
        (batch) => batch.id !== batchId,
      );

      if (
        mulai >=
          this.formatDateHour(
            otherBatch[0].waktuMulai,
          ) &&
        mulai <=
          this.formatDateHour(
            otherBatch[0].waktuSelesai,
          )
      ) {
        throw new BadRequestException([
          'Waktu mulai batch telah ada',
        ]);
      }
    }

    const updateBatch =
      await this.prisma.batch.update({
        where: {
          id: batchId,
        },
        data: {
          ...dto,
        },
      });

    const res = {
      id: updateBatch.id,
      jumlah: updateBatch.jumlah,
      waktuMulai: this.formatTime(
        updateBatch.waktuMulai,
      ),
      waktuSelesai: this.formatTime(
        updateBatch.waktuSelesai,
      ),
    };
    return res;
  }

  async getActiveBatch(jam: number) {
    const batchs =
      await this.prisma.batch.findMany();

    const res = batchs.map((e) => {
      return {
        id: e.id,
        jumlah: e.jumlah,
        mulai: this.formatDateHour(e.waktuMulai),
        selesai: this.formatDateHour(
          e.waktuSelesai,
        ),
      };
    });

    const x = res.filter((w) => {
      return jam >= w.mulai && jam <= w.selesai;
    });

    return x;
  }

  formatTime(waktu) {
    const d = new Date(waktu);

    return d.toLocaleTimeString();
  }

  formatDateHour(waktu) {
    const d = new Date(waktu);
    const h = d.getHours();
    return h;
  }
}
