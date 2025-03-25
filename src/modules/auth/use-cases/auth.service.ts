import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { JWT_SECRET } from 'src/shared/global.constants';

import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/domain/user.entity';
import { GetByEmailService } from 'src/modules/user/use-cases/get-by-email/get-by-email.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly getByEmailService: GetByEmailService,
    private jwtService: JwtService
  ) { }
  async validateUser(email: string, password: string) {

    const account = await this.getByEmailService.execute({ email });
    if (!account.data) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, account.data.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }

    return account.data
  }
  getToken(user: Pick<User, 'id' | 'username' | 'email'>): string {
    const payload = {
      username: user.username,
      email: user.email,

    }
    return this.jwtService.sign(payload, { secret: JWT_SECRET });
  }
}
