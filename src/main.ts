import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app/module';
import { configHttp } from './configs/http';
import { configSwagger } from './configs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'warn', 'log'],
  });
  configHttp(app);
  configSwagger(app);
}

bootstrap();
