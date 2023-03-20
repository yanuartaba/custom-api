import {
  // IsNumberString,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  // @IsNumberString()
  // userId: number;
}
