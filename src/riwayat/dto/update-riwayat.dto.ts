import {
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateRiwayatDto {
  @IsNumber()
  @IsNotEmpty()
  isProses: number;
}
