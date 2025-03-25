import { Injectable } from "@nestjs/common";
import { IUserRepo } from "./user-repo.interface";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { User } from "../domain/user.entity";
import { UserMappers } from "../mappers/user.mappers";

@Injectable()
export class UserRepo implements IUserRepo {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    return UserMappers.toDomain(user)
  }
}
