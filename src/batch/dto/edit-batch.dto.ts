import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class EditBatchDto {
  @IsNumber()
  @IsOptional()
  @Min(5)
  @Max(100)
  jumlah: number;

  // @IsString()
  @IsOptional()
  waktuMulai: string;

  // @IsString()
  @IsOptional()
  waktuSelesai: string;
}
