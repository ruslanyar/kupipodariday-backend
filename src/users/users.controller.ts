import { Request } from 'express';
import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUser(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

  @Post('find')
  findMany(@Body() findUserDto: FindUserDto) {
    const { query } = findUserDto;
    return this.usersService.findMany({
      where: [{ username: query }, { email: query }],
    });
  }
}
