import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { BatchService } from './batch.service';
import { EditBatchDto } from './dto';

@Controller('batch')
export class BatchController {
  constructor(
    private batchService: BatchService,
  ) {}

  @Get()
  getAllBatch() {
    return this.batchService.getBatchs();
  }

  @Get(':jam')
  getBatch(
    @Param('jam', ParseIntPipe) jam: number,
  ) {
    return this.batchService.getActiveBatch(jam);
  }

  @Patch(':id')
  editBatchById(
    @Param('id', ParseIntPipe) batchId: number,
    @Body() dto: EditBatchDto,
  ) {
    return this.batchService.editBatchById(
      batchId,
      dto,
    );
  }
}
