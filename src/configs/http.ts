import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../commons/filters/http-exception.filter';
import { APPLICATION } from 'src/modules/app/config';

export function configHttp(app: INestApplication) {
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });
  app.setGlobalPrefix('api/v1/');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const PORT = process.env.SERVER_PORT;
  const HOST = process.env.SERVER_HOST;

  app.listen(PORT, () => {
    Logger.log(
      `Server is running on: http://${HOST}:${PORT}/api-docs `,
      APPLICATION,
    );
  });
}
