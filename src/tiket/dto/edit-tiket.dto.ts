import {
  IsInt,
  IsOptional,
} from 'class-validator';

export class EditTiketDto {
  @IsOptional()
  isIdle: boolean;

  @IsInt()
  @IsOptional()
  status: number;

  @IsInt()
  @IsOptional()
  roomId: number;

  @IsInt()
  @IsOptional()
  batchId: number;

  @IsInt()
  @IsOptional()
  noUrutan: number;
}
