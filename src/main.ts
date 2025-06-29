import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'error', 'warn'],
  });

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService = app.get<ConfigService>(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('picSpace')
    .setDescription('API para gerenciamento de imagens')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(7070);

}
bootstrap();