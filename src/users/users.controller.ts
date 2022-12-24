import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
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

  @Post('find')
  findMany(@Body() findUserDto: FindUserDto) {
    const { query } = findUserDto;
    return this.usersService.findMany({
      where: [{ username: query }, { email: query }],
    });
  }
}
