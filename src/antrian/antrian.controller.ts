import { CreateAntrianDto } from './dto';
import { EditAntrianDto } from './dto/edit-antrian.dto';
import { AntrianService } from './antrian.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/aurh/guard';

@Controller('antrian')
export class AntrianController {
  constructor(
    private antrianService: AntrianService,
  ) {}

  @Get()
  getAllAntrian(
    @Query('group') group: string,
    @Query('statusAntrian', ParseIntPipe)
    statusAntrian: number,
    @Query('listAntrian', ParseBoolPipe)
    listAntrian: boolean,
  ) {
    return this.antrianService.getAllAntrian(
      group,
      statusAntrian,
      listAntrian,
    );
  }

  @Post()
  createAntrian(@Body() dto: CreateAntrianDto) {
    return this.antrianService.createAntrian(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateAntrian(
    @Param('id', ParseIntPipe) antrianId: number,
    @Body() dto: EditAntrianDto,
  ) {
    return this.antrianService.updateAntrian(
      antrianId,
      dto,
    );
  }

  @Patch('skip/:id')
  skipAntrian(
    @Param('id', ParseIntPipe) antrianId: number,
  ) {
    return this.antrianService.skipAntrian(
      antrianId,
    );
  }

  @UseGuards(JwtGuard)
  @Get('/summary')
  statsAntrian(
    @Query('periode') periode: string,
  ) {
    return this.antrianService.statsAntrian(
      periode,
    );
  }
}
