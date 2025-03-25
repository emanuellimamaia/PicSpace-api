import { User } from "../domain/user.entity";

export interface IUserRepo {
  findByEmail(email: string): Promise<User>
}