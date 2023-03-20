import { EditMenuDto } from './dto/edit-menu.dto';
import { CreateMenuDto } from './dto/create-menut.dto';
import { MenuService } from './menu.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  ParseIntPipe,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { JwtGuard } from 'src/aurh/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getMenus() {
    return this.menuService.index();
  }

  @UseGuards(JwtGuard)
  @Post()
  createMenu(@Body() dto: CreateMenuDto) {
    return this.menuService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateMenu(
    @Param('id', ParseIntPipe) menuId: number,
    @Body() dto: EditMenuDto,
  ) {
    return this.menuService.update(menuId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete(':id')
  deleteMenu(
    @Param('id', ParseIntPipe) menuId: number,
  ) {
    return this.menuService.delete(menuId);
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', file);
    return { file };
  }
}
