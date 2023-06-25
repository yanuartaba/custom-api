import { Module } from '@nestjs/common';
import { RiwayatController } from './riwayat.controller';
import { RiwayatService } from './riwayat.service';

@Module({
  controllers: [RiwayatController],
  providers: [RiwayatService]
})
export class RiwayatModule {}
