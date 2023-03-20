import {
  IsNotEmpty,
  // IsNumber,
  IsString,
} from 'class-validator';

export class CreateAntrianDto {
  // @IsNumber()
  // @IsNotEmpty()
  // nomor: number;

  @IsNotEmpty()
  @IsString()
  group: string;
}
