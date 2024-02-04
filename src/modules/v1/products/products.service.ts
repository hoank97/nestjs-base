import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProductsService {
  constructor(private logger: Logger) {}
  // handle and process "OrderCreatedEvent" event
  @OnEvent('order.created')
  handleOrderCreatedEvent(payload: any) {
    this.logger.debug('Handle event');
    console.log(payload);
  }
}
