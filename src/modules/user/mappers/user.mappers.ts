import { User as UserClient } from "@prisma/client";
import { User } from "../domain/user.entity";
import { UserDto } from "../dto/user.dto";


export class UserMappers {
  static toDomain(raw: UserClient): User {
    return User.create({
      id: raw.id,
      username: raw.username,
      email: raw.email,
      password: raw.password,
    })
  }

  static toDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    }
  }
}