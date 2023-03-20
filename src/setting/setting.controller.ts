import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Patch,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { HeaderDTO } from './dto/header.dto';

@Controller('setting')
export class SettingController {
  constructor(
    private settingService: SettingService,
  ) {}

  @Get()
  getSetting() {
    return this.settingService.getSetting();
  }

  @Patch()
  updateSetting(
    @Body() dto: UpdateSettingDto,
    @Headers() headers: HeaderDTO,
  ) {
    return this.settingService.updateSetting(
      dto,
      headers,
    );
  }
}
