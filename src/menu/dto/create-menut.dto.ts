import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUniqueConstraint } from '../decorator/isUnique.decorator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  // @Validate(IsUniqueConstraint, ['menu'])
  codeGroup: string;

  @IsString()
  @IsNotEmpty()
  urlParam: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;
}
