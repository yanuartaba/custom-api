import { HeaderDTO } from './dto/header.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PinCodeDTO } from './dto/pincode.dto';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  async getSetting() {
    const info =
      await this.prisma.setting.findFirst({
        where: {
          id: 1,
        },
      });

    return info;
  }

  async updateSetting(
    dto: UpdateSettingDto,
    headers: HeaderDTO,
  ) {
    const secureSet = headers['codepipe'];

    if (
      secureSet !==
      'GJddPyb9jqK1Bxm68wqLRcYsNPt2UKJC'
    ) {
      throw new UnauthorizedException(
        'Setting not authorized',
      );
    }

    const setting =
      await this.prisma.setting.update({
        where: {
          id: 1,
        },
        data: {
          ...dto,
        },
      });

    return setting;
    // setting;
  }

  async securePage(dto: PinCodeDTO) {
    const setting: object =
      await this.prisma.setting.findFirst({
        where: {
          id: 1,
        },
      });

    if (setting['pin_code'] !== dto.pin_code) {
      throw new UnauthorizedException(
        'Not authorized',
      );
    } else {
      return {
        status: true,
        statusCode: 200,
      };
    }
  }
}
