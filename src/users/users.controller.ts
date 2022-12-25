import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtGuard } from 'src/auth/jwt.guard';

import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithUser } from 'src/utils/request-with-user';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getUser(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Patch('me')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  getMyWishes(@Req() req: RequestWithUser) {
    return this.usersService.getUserWishes({
      where: { id: req.user.id },
      relations: {
        wishes: true,
      },
    });
  }

  @Get(':username')
  @UseInterceptors(ClassSerializerInterceptor)
  getByUsername(@Param('username') username: string) {
    return this.usersService.findOne({
      where: { username },
    });
  }

  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishes({
      where: { username },
      relations: {
        wishes: true,
      },
    });
  }

  @Post('find')
  @UseInterceptors(ClassSerializerInterceptor)
  findMany(@Body() findUserDto: FindUserDto) {
    const { query } = findUserDto;
    return this.usersService.findMany({
      where: [{ username: query }, { email: query }],
    });
  }
}
