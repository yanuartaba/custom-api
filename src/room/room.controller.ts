import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtGuard } from 'src/aurh/guard';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getRooms() {
    return this.roomService.index();
  }

  @Get('/all')
  getAllRoom() {
    return this.roomService.listRooms();
  }

  @Get('/:id')
  getRoomById(
    @Param('id', ParseIntPipe) roomId: number,
    batchId: number,
  ) {
    return this.roomService.show(roomId, batchId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createRoom(@Body() dto: CreateRoomDto) {
    return this.roomService.createRoom(dto);
  }
}
