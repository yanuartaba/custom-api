import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      //save the new user into db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });

      //remove hash property from user data
      delete user.hash;
      //return the saved user
      // return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credientials error',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //find user by email
    const user = await this.prisma.user.findFirst(
      {
        where: {
          email: dto.email,
        },
      },
    );
    //if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Crediential incorrect',
      );
    //compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    //if password does not match throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Crediential incorrect',
      );
    //send back the user
    // delete user.hash;

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '1d',
        secret: this.config.get('JWT_SECRET'),
      },
    );

    return {
      access_token: token,
    };
  }
}
