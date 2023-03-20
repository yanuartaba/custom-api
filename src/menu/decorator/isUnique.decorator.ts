import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({
  name: 'isUnique',
  async: true,
})
@Injectable()
export class IsUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ) {
    const model =
      validationArguments.constraints[0];

    const field = validationArguments
      .constraints[1]
      ? validationArguments.constraints[1]
      : validationArguments.property;
    console.log({
      model: model,
      field: field,
      value: value,
    });
    const data = await this.prisma[
      model
    ]?.findFirst({
      where: {
        [field]: value,
      },
    });
    console.log(data);
    return !data;
  }

  defaultMessage() {
    return '$property $value is already exist';
  }
}
