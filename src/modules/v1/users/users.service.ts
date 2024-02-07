import { Injectable } from '@nestjs/common';
import { LogService } from 'src/commons/logging/logger.service';
import { CreateUserDto } from './dto/create-user';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    private logger: LogService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateUserDto) {
    this.eventEmitter.emit('order.created', {
      orderId: 1,
      payload: {},
    });
    return data;
  }

  async findAll() {
    this.logger.error(UsersService.name, 'Logging an error');
    return `This action returns all users22`;
  }

  async findOne(id: number) {
    this.logger.debug(UsersService.name, 'Logging an debug');
    return `This action return a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
