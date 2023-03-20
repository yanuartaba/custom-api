import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Match } from '../decorator/match.decorator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: 'Confirmation password not match',
  })
  confirmation_password: string;
}
