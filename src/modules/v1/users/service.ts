import { Injectable } from '@nestjs/common';
import { LogService } from 'src/commons/logging/logger.service';
import { CreateUserDto } from './dto/create-user';

@Injectable()
export class UsersService {
  constructor(private myLogger: LogService) {
    this.myLogger.setContext(UsersService.name);
  }

  async create(data: CreateUserDto) {
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
