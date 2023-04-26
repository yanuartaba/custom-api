import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { HeaderDTO } from './dto/header.dto';
import { PinCodeDTO } from './dto/pincode.dto';

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

  @HttpCode(200)
  @Post('code')
  securePage(@Body() dto: PinCodeDTO) {
    return this.settingService.securePage(dto);
  }
}
