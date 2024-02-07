import { Injectable } from '@nestjs/common';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
import { format } from 'winston';

@Injectable()
export class LoggingService {
  private readonly logger: winston.Logger;

  private printFormat = format.printf(({ path, level, message, timestamp }) => {
    return `${timestamp} [${level}]-[${path}]:: ${JSON.stringify(message)}`;
  });

  private debugTransports: DailyRotateFile = new DailyRotateFile({
    dirname: 'src/logs',
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    level: 'debug',
  });

  private errorTransports: DailyRotateFile = new DailyRotateFile({
    dirname: 'src/logs',
    filename: 'application-%DATE%.error.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    level: 'error',
  });

  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
        this.printFormat,
      ),
      transports: [
        new winston.transports.Console(),
        this.debugTransports,
        this.errorTransports,
      ],
    });
  }

  error(path: string, message: string) {
    const timestamp = new Date().toISOString();
    this.logger.error({
      path,
      message,
      timestamp,
    });
  }

  debug(path: string, message: string) {
    const timestamp = new Date().toISOString();
    this.logger.debug({
      path,
      message,
      timestamp,
    });
  }
}
