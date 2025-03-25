import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "src/infra/database.module";
import { JWT_SECRET } from "src/shared/global.constants";
import { GetByEmailService } from "./use-cases/get-by-email/get-by-email.service";
import { AuthService } from "../auth/use-cases/auth.service";
import { JwtStrategy } from "../auth/jwt.strategy";
import { LocalStrategy } from "../auth/local.strategy";
import { AuthController } from "../auth/use-cases/auth.controller";
import { UserRepo } from "./repositories/user-repo";
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { CreateUserController } from "./use-cases/create-user/create-user.controller";


@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController, CreateUserController],
  providers: [GetByEmailService, AuthService, LocalStrategy, JwtStrategy, UserRepo, { provide: "IUserRepo", useExisting: UserRepo }, CreateUserService],
  exports: ['IUserRepo', GetByEmailService]
})
export class UserModule { }