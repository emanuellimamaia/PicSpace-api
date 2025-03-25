import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "src/shared/global.constants";

import { AuthService } from "./use-cases/auth.service";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from "src/infra/database.module";
import { GetByEmailService } from "../user/use-cases/get-by-email/get-by-email.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { JwtAuthGuard } from "./jwt.guard";
import { UserRepo } from "../user/repositories/user-repo";
import { AuthController } from "./use-cases/auth.controller";

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [AuthService, GetByEmailService, LocalStrategy, JwtStrategy, JwtAuthGuard, UserRepo],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }