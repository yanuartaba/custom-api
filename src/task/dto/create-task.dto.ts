import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  group: string;

  @IsInt()
  @IsNotEmpty()
  petugasId: number;

  @IsInt()
  @IsNotEmpty()
  counterId: number;

  @IsInt()
  @IsNotEmpty()
  antrianId: number;
}
