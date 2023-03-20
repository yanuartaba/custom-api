import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './aurh/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { MenuModule } from './menu/menu.module';
import { CounterModule } from './counter/counter.module';
import { AntrianModule } from './antrian/antrian.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { EventsModule } from './socket/event.module';
import { TaskModule } from './task/task.module';
import { MediaModule } from './media/media.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BookmarkModule,
    MenuModule,
    CounterModule,
    AntrianModule,
    MulterModule.register({ dest: './uploads' }),
    EventsModule,
    TaskModule,
    MediaModule,
    SettingModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class AppModule {}
