import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { BatchModule } from 'src/batch/batch.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [BatchModule],
})
export class RoomModule {}
