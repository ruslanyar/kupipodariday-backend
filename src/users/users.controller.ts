import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtGuard } from 'src/auth/jwt.guard';

import { User } from './entities/user.entity';

import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getUser(@Req() req: Request) {
    return req.user;
  }

  @Patch('me')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const user = req.user as User;
    return this.usersService.updateOne(user.id, updateUserDto);
  }

  @Get('me/wishes')
  getMyWishes(@Req() req: Request) {
    const user = req.user as User;
    return this.usersService
      .findOne({
        where: { id: user.id },
        relations: {
          wishes: {
            owner: true,
          },
        },
      })
      .then((user) => user.wishes);
  }

  @Get(':username')
  getByUsername(@Param('username') username: string) {
    return this.usersService.findOne({
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { username },
    });
  }

  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService
      .findOne({
        where: { username },
        relations: {
          wishes: true,
        },
      })
      .then((user) => user.wishes);
  }

  @Post('find')
  findMany(@Body() findUserDto: FindUserDto) {
    const { query } = findUserDto;
    return this.usersService.findMany({
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      where: [{ username: query }, { email: query }],
    });
  }
}
