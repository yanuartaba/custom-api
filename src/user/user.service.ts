import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async index() {
    const users = await this.prisma.user.findMany(
      {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          isAdmin: true,
          createdAt: true,
          hash: false,
        },
        orderBy: [{ createdAt: 'asc' }],
      },
    );

    return users;
  }

  async createUser(dto: CreateUserDto) {
    const hashPassword = await argon.hash(
      'password123',
    );

    const exsistingEmail =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (exsistingEmail) {
      throw new BadRequestException(
        'Email already exist',
      );
    }
    // return hashPassword;
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hashPassword,
        name: dto.name,
        avatar: dto.avatar,
        isAdmin: dto.isAdmin,
      },
    });

    return user;
  }

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    if (dto.password) {
      const hashPassword = await argon.hash(
        dto.password,
      );
      dto.password = hashPassword;
    }
    console.log(dto);
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: dto.name,
        email: dto.email,
        hash: dto.password,
        isAdmin: dto.isAdmin,
      },
    });

    delete user.hash;

    return user;
  }

  async updatePassword(dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findFirst(
      {
        where: {
          email: dto.email,
        },
      },
    );
    if (!user) {
      throw new BadRequestException(
        'Email doesnt exist',
      );
    }

    const hashPassword = await argon.hash(
      dto.password,
    );

    const newPass = await this.prisma.user.update(
      {
        where: {
          email: dto.email,
        },
        data: {
          hash: hashPassword,
        },
      },
    );

    // return { message: 'Renew Password success' };
    return newPass;
  }
}
