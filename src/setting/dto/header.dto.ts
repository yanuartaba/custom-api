import {
  IsDefined,
  IsString,
} from 'class-validator';

export class HeaderDTO {
  @IsString()
  @IsDefined()
  codeline: string;
}
