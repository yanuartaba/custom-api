import { EditCounterDto } from './dto/edit-counter.dto';
import { CreateCounterDto } from './dto/create-counter.dto';
import { CounterService } from './counter.service';
import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  Param,
  Get,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { JwtGuard } from 'src/aurh/guard';

@Controller('counter')
export class CounterController {
  constructor(
    private counterService: CounterService,
  ) {}

  @Get()
  listCounter() {
    return this.counterService.getAllCounter();
  }

  @UseGuards(JwtGuard)
  @Post()
  createCounter(@Body() dto: CreateCounterDto) {
    return this.counterService.createCounter(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateCounter(
    @Param('id', ParseIntPipe) counterId: number,
    @Body() dto: EditCounterDto,
  ) {
    return this.counterService.updateCounter(
      counterId,
      dto,
    );
  }

  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteCounter(
    @Param('id', ParseIntPipe) counterId: number,
  ) {
    return this.counterService.deleteCounter(
      counterId,
    );
  }
}
