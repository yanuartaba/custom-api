import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  ParseIntPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TiketService } from './tiket.service';
import { JwtGuard } from './../aurh/guard/jwt.guard';
import { EditTiketDto } from './dto/edit-tiket.dto';
// import { CreateTiketDto } from './dto/create-tiket.dto';

@Controller('tiket')
export class TiketController {
  constructor(
    private tiketService: TiketService,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllTiket() {
    return this.tiketService.index();
  }

  @UseGuards(JwtGuard)
  @Get('batch')
  getAllTiketBySesion() {
    return this.tiketService.listTiketByBatch();
  }

  @UseGuards(JwtGuard)
  @Post()
  createTiket() {
    return this.tiketService.createTiket();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  showTiketById(
    @Param('id', ParseIntPipe) tiketId: number,
  ) {
    return this.tiketService.getTiketById(
      tiketId,
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateTiket(
    @Param('id', ParseIntPipe)
    tiketId: number,
    @Body()
    dto: EditTiketDto,
  ) {
    return this.tiketService.updateTiket(
      tiketId,
      dto,
    );
  }
}
