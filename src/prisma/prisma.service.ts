import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaClient } from '@prisma/client';
export * from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  [x: string]: any;
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
