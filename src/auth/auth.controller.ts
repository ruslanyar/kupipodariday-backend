import {
  Body,
  Controller,
  Post,
  Req,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';

import { GROUP_USER } from 'src/utils/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RequestWithUser } from 'src/utils/request-with-user';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Req() req: RequestWithUser) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  @SerializeOptions({ groups: [GROUP_USER] })
  async signup(@Body() createUserDto: CreateUserDto) {
    const { about, ...rest } = createUserDto;
    const dto = (about === '' ? rest : createUserDto) as CreateUserDto;

    const user = await this.userService.create(dto);
    this.authService.auth(user);
    return user;
  }
}
