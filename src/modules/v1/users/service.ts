import { Injectable } from '@nestjs/common';
import { LogService } from 'src/commons/logging/logger.service';
import { CreateUserDto } from './dto/create-user';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    private myLogger: LogService,
    private eventEmitter: EventEmitter2,
  ) {
    this.myLogger.setContext(UsersService.name);
  }

  async create(data: CreateUserDto) {
    this.eventEmitter.emit('order.created', {
      orderId: 1,
      payload: {},
    });
    console.log(data);
    return data;
  }

  async findAll() {
    this.myLogger.log('This action returns all users');
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action return a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
