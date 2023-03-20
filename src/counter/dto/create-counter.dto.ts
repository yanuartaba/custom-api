import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCounterDto {
  @IsString()
  @IsNotEmpty()
  nomorCounter: string;

  @IsString()
  @IsNotEmpty()
  group: string;
}
