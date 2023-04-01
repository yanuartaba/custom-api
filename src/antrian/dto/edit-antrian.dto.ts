import {
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class EditAntrianDto {
  @IsOptional()
  group: string;

  @IsNumber()
  @IsOptional()
  statusAntrian: number;
}
