import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/shared/global.constants';
import { GetByEmailService } from '../user/use-cases/get-by-email/get-by-email.service';
import { UserMappers } from '../user/mappers/user.mappers';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private getByEmailService: GetByEmailService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    })
  }

  async validate(payload) {
    const user = await this.getByEmailService.execute({ email: payload.email });
    return UserMappers.toDto(user.data)
  }
}