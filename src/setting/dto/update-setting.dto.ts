import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsJSON,
  IsOptional,
  IsString,
} from 'class-validator';

enum BannerTypeEnum {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

enum ThemeEnum {
  DEFAULT = 'DEFAULT',
  REDMINE = 'REDMINE',
  SUHNSHINE = 'SUNSHINE',
}

export class UpdateSettingDto {
  @IsEnum(BannerTypeEnum)
  @IsOptional()
  banner_type?: BannerTypeEnum;

  @IsInt()
  @IsOptional()
  durasi_transition?: number;

  @IsJSON()
  @IsOptional()
  file_banner?: string;

  @IsString()
  @IsOptional()
  logo_header?: string;

  @IsString()
  @IsOptional()
  text_header: string;

  @IsEnum(ThemeEnum)
  @IsOptional()
  theme?: ThemeEnum;

  @IsInt()
  @IsOptional()
  grid?: number;

  @IsBoolean()
  @IsOptional()
  running_text_active?: boolean;

  @IsString()
  @IsOptional()
  running_text?: string;

  @IsString()
  @IsOptional()
  logo_print?: string;

  @IsString()
  @IsOptional()
  text_print?: string;

  @IsInt()
  @IsOptional()
  fontsize_print?: number;

  @IsString()
  @IsOptional()
  pin_code: string;

  @IsBoolean()
  @IsOptional()
  background_enable: boolean;

  @IsString()
  @IsOptional()
  background_img: string;
}
