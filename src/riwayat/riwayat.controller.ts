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

@Controller('riwayat')
export class RiwayatController {
  constructor(
    private riwayatService: RiwayatService,
  ) {}

  @Post()
  createRiwayat(@Body() dto: CreateRiwayatDto) {
    return this.riwayatService.createRiwayat(dto);
  }

  @Patch(':id')
  updateRiwayat(
    @Param('id', ParseIntPipe) riwayatId: number,
    @Body() dto: CreateRiwayatDto,
  ) {
    return this.riwayatService.updateRiwayat(
      riwayatId,
      dto,
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
