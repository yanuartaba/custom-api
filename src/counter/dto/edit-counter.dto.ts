import {
  IsOptional,
  IsString,
} from 'class-validator';

export class EditCounterDto {
  @IsString()
  @IsOptional()
  nomorCounter?: string;

  @IsString()
  @IsOptional()
  group?: string;
}
