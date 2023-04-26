import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from './../aurh/guard/jwt.guard';
import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) antrianId: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(
      antrianId,
      dto,
    );
  }

  @Get('/summary')
  summaryTask(
    @Query('periode')
    periode: string,
  ) {
    return this.taskService.summaryTask(periode);
  }
}
