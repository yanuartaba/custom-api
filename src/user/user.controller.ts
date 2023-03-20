import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  GetUserId,
  GetUser,
} from './../aurh/decorator';
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from './../aurh/guard/jwt.guard';
import { User } from '@prisma/client';
import {
  EditUserDto,
  UpdatePasswordDto,
} from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllUser() {
    return this.userService.index();
  }

  @UseGuards(JwtGuard)
  @Post('add')
  createUser(@Body() dto: CreateUserDto) {
    // console.log(dto);
    return this.userService.createUser(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  adminEditUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: EditUserDto,
  ) {
    // console.log(dto);
    return this.userService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  editUser(
    @GetUserId('id', ParseIntPipe) userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

  // @UseGuards(JwtGuard)
  // @Patch()
  // test(
  //   @GetUserId('id', ParseIntPipe) userId: number,
  //   // @GetUser() user: User,
  // ) {
  //   return userId;
  // }

  @Patch('renew-password')
  updatePassword(@Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(dto);
  }
}
