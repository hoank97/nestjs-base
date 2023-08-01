import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IExceptionFilter } from 'src/commons/interfaces/http-exceptions.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { message } = exception;

    const bodyResponse: IExceptionFilter = {
      path: request.url,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(bodyResponse);
  }
}
