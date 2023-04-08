import {
  // IsNumberString,
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
