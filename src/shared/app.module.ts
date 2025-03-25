import { Module } from '@nestjs/common';
import { PicturesModule } from '../modules/pictures.modules';
import { ConfigModule } from '@nestjs/config';
import { ClarifaiModule } from '../modules/clarifai/clarifai.module';
import { DatabaseModule } from 'src/infra/database.module';
import { GLOBAL_CONFIG } from 'src/config/global.config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    PicturesModule,
    ClarifaiModule,
    DatabaseModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule { }
