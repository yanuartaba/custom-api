import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PinCodeDTO {
  @IsString()
  @IsNotEmpty()
  pin_code: string;
}
