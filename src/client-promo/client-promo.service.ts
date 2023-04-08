import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientPromoService {
  constructor(private prisma: PrismaService) {}

  async createClient(dto: CreateClientDto) {
    const client =
      await this.prisma.client.create({
        data: {
          email: dto.email,
        },
      });

    return client;
  }
}
