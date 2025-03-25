import { Inject, Injectable } from '@nestjs/common';
import { IUserRepo } from '../../repositories/user-repo.interface';



type Input = {
  email: string
}

@Injectable()
export class GetByEmailService {
  constructor(
    @Inject('IUserRepo')
    private readonly userRepo: IUserRepo,
  ) { }
  async execute(input: Input) {
    const result = await this.userRepo.findByEmail(input.email)
    if (!result) {
      return {
        message: 'usuário não encontrado'
      }
    }
    return {
      data: result,
      message: 'Usuário encontrado',
    }
  }

}
