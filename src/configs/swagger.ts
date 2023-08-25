import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APPLICATION, DESCRIPTION } from 'src/modules/app/config';

export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(APPLICATION)
    .setDescription(DESCRIPTION)
    .setVersion('1.0')
    .addTag(APPLICATION)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
