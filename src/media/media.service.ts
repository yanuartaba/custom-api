import { CreateMediaDto } from './dto/create-medit.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class MediaService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async createMedia(dto: CreateMediaDto) {
    const media =
      await this.prismaService.media.create({
        data: {
          ...dto,
        },
      });

    return media;
  }

  async getMedias() {
    const medias =
      await this.prismaService.media.findMany({
        orderBy: [
          {
            createdAt: 'asc',
          },
        ],
      });
    return medias;
  }

  async deleteMedia(mediaId: number) {
    const media =
      await this.prismaService.media.findFirst({
        where: {
          id: mediaId,
        },
      });

    if (!media) {
      throw new NotFoundException(
        'Media not found',
      );
    }

    if (media.isAsset === true) {
      fs.unlinkSync('files/' + media.url);
      console.log(
        'successfully deleted /tmp/hello',
      );
    }

    await this.prismaService.media.delete({
      where: {
        id: mediaId,
      },
    });

    return;
  }
}
