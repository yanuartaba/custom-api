import {
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTiketDto {
  @IsInt()
  @IsNotEmpty()
  nomor: number;

  @IsInt()
  @IsOptional()
  roomId: number;

  @IsOptional()
  isIdle: boolean;

  @IsInt()
  @IsOptional()
  status: number;

  @IsInt()
  @IsNotEmpty()
  batchId: number;
}
