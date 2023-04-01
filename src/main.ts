import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/modules/app/app.module';
import { APPLICATION, DESCRIPTION } from './constants/variables.constants';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'warn', 'log'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT;
  const HOST = process.env.HOST;

  const config = new DocumentBuilder()
    .setTitle(APPLICATION)
    .setDescription(DESCRIPTION)
    .setVersion('1.0')
    .addTag(APPLICATION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    Logger.log(
      `Server is running on PORT ${PORT}: http://${HOST}:${PORT}/api `,
      APPLICATION,
    );
  });
}
bootstrap();
