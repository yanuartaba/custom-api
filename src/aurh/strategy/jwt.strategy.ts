import { PrismaService } from './../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: {
    sub: number;
    email: string;
  }) {
    // console.log({
    //   payload,
    // });
    const user = await this.prisma.user.findFirst(
      {
        where: {
          id: payload.sub,
        },
      },
    );
    delete user.hash;
    return user;
  }
}
