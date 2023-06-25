import { Module } from '@nestjs/common';
import { TiketController } from './tiket.controller';
import { TiketService } from './tiket.service';
import { BatchService } from 'src/batch/batch.service';
import { BatchModule } from 'src/batch/batch.module';

@Module({
  controllers: [TiketController],
  providers: [TiketService],
  imports: [BatchModule],
})
export class TiketModule {}
