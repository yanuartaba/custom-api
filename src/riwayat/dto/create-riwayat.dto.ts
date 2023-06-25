import {
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateRiwayatDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  tiketId: number;

  @IsNumber()
  @IsNotEmpty()
  isProses: number;
}
