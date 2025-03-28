import { Body, Controller, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';

import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { AuthUserDto } from '../dto/auth-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiExtraModels(AuthUserDto)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async handle(@Request() req, @Body() data: AuthUserDto) {
    try {
      const { id, role, username } = req.user;
      const { email } = data;
      const token = this.authService.getToken({ id, username, email });
      return { id, role, token, email, username };
    } catch (error) {
      throw error;
    }
  }

}

