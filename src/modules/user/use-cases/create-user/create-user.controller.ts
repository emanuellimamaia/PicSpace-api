import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserMappers } from '../../mappers/user.mappers';

@ApiTags('Auth')
@Controller('create-user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) { }

  @Post()
  async createUser(@Body() input: CreateUserDto) {
    const result = await this.createUserService.execute(input)
    return { ...result, data: UserMappers.toDto(result.data) }
  }
}
