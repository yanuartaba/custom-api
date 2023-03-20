import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  @MinLength(5)
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsBoolean()
  isAdmin: boolean;
}
