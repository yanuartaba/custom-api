import {
  IsNotEmpty,
  IsString,
  // Validate,
} from 'class-validator';
// import { IsUniqueConstraint } from 'src/menu/decorator/isUnique.decorator';

export class CreateCounterDto {
  @IsString()
  @IsNotEmpty()
  // @Validate(IsUniqueConstraint, ['counter'])
  nomorCounter: string;

  @IsString()
  @IsNotEmpty()
  group: string;
}
