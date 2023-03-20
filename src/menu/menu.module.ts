import { MenuFileController } from './menu-file.controller';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Module } from '@nestjs/common';
import { IsUniqueConstraint } from '../menu/decorator/isUnique.decorator';

@Module({
  controllers: [
    MenuController,
    MenuFileController,
  ],
  providers: [MenuService, IsUniqueConstraint],
})
export class MenuModule {}
