import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RiwayatService } from './riwayat.service';
import { CreateRiwayatDto } from './dto/create-riwayat.dto';
import { JwtGuard } from 'src/aurh/guard';
import { UpdateRiwayatDto } from './dto/update-riwayat.dto';

@Controller('riwayat')
export class RiwayatController {
  constructor(
    private riwayatService: RiwayatService,
  ) {}

  @Post()
  createRiwayat(@Body() dto: CreateRiwayatDto) {
    return this.riwayatService.createRiwayat(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':roomId/:tiketId')
  updateRiwayat(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Param('tiketId', ParseIntPipe)
    tiketId: number,
    @Body()
    dtoUpdate: UpdateRiwayatDto,
  ) {
    return this.riwayatService.updateRiwayat(
      roomId,
      tiketId,
      dtoUpdate,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':roomId/:tiketId')
  deleteRiwayat(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Param('tiketId', ParseIntPipe)
    tiketId: number,
  ) {
    return this.riwayatService.deleteRiwayat(
      roomId,
      tiketId,
    );
  }
}
