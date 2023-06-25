import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @IsString()
  @IsOptional()
  color: string;
}
