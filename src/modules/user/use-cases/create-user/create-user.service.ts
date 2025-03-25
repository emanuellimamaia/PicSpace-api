import { Inject, Injectable } from '@nestjs/common';
import { UserRepo } from '../../repositories/user-repo';
import { CreateUserDto } from '../../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/user.entity';
@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUserRepo')
    private readonly userRepo: UserRepo
  ) { }

  async execute(input: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(input.password, 10)
    const user = User.create({
      email: input.email,
      password: hashedPassword,
      username: input.username
    })
    const data = await this.userRepo.create(user)
    return { type: "CreateAccount", data }
  }

}
