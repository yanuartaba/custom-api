import { CreateMediaDto } from './dto/create-medit.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { HttpCode } from '@nestjs/common/decorators';

@Controller('media')
export class MediaController {
  constructor(
    private mediaService: MediaService,
  ) {}

  @Get()
  getMedias() {
    return this.mediaService.getMedias();
  }

  @HttpCode(204)
  @Delete(':id')
  deleteMedia(
    @Param('id', ParseIntPipe) mediaId: number,
  ) {
    return this.mediaService.deleteMedia(mediaId);
  }

  @Post('upload')
  uploadFile(@Body() dto: CreateMediaDto) {
    return this.mediaService.createMedia(dto);
  }
}
