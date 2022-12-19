import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('secretKey'),
    });
  }

  async validate(jwtPayload: { sub: number }) {
    const user = this.userService.findOne({ where: { id: jwtPayload.sub } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
