import { Module } from '@nestjs/common';
import { PicturesModule } from './modules/pictures.modules';  // Verifique o nome correto do arquivo
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PicturesModule,
  ],
})
export class AppModule { }
