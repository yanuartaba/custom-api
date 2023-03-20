import { CreateAntrianDto } from './dto';
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
} from '@nestjs/common';

@Controller('antrian')
export class AntrianController {
  constructor(
    private antrianService: AntrianService,
  ) {}

  @Get()
  getAllAntrian(
    @Query('group') group: string,
    @Query('isFinish', ParseBoolPipe)
    isFinish: boolean,
    @Query('isSkip', ParseBoolPipe)
    isSkip: boolean,
  ) {
    return this.antrianService.getAllAntrian(
      group,
      isFinish,
      isSkip,
    );
  }

  @Post()
  createAntrian(@Body() dto: CreateAntrianDto) {
    return this.antrianService.createAntrian(dto);
  }

  @Patch(':id')
  updateAntrian(
    @Param('id', ParseIntPipe) antrianId: number,
  ) {
    return this.antrianService.updateAntrian(
      antrianId,
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
}
