import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LogService extends ConsoleLogger {
  customLog() {
    this.log('Please feed the cat!');
  }
}
