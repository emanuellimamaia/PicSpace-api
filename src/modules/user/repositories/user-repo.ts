import { ConflictException, Injectable } from "@nestjs/common";
import { IUserRepo } from "./user-repo.interface";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { User } from "../domain/user.entity";
import { UserMappers } from "../mappers/user.mappers";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class UserRepo implements IUserRepo {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    return UserMappers.toDomain(user)
  }
  async create(user: User): Promise<User> {
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      })
      return UserMappers.toDomain(createdUser)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email já está em uso.');
      }
      throw new Error('Failed to create user')
    }
  }
}
