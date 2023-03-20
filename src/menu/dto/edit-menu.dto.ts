import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditMenuDto {
  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsOptional()
  codeGroup: string;

  @IsString()
  @IsOptional()
  urlParam: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
