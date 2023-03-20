import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class EditAntrianDto {
  @IsOptional()
  group: string;

  @IsBoolean()
  @IsOptional()
  isFinish: boolean;

  @IsBoolean()
  @IsOptional()
  isSkip: boolean;
}
