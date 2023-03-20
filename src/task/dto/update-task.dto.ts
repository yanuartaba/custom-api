import {
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class UpdateTaskDto {
  @IsInt()
  @IsNotEmpty()
  petugasId: number;
}
