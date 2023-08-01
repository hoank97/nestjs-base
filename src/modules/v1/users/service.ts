import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/commons/database';
import { MyLogger } from 'src/commons/logging/logger.service';
import { CreateUserDto } from './dto/create-user';
import { UserEntity } from './entities/user.entity';
import { IUser } from './interfaces';
import UserRepository from './repository';

@Injectable()
export class UsersService extends BaseRepository<UserEntity> {
  constructor(private myLogger: MyLogger, model: UserRepository) {
    super(model);
    this.myLogger.setContext(UsersService.name);
  }

  async create(data: CreateUserDto) {
    console.log({ data });
    return this.model.save(data);
  }

  async findAll() {
    this.myLogger.log('This action returns all users');
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<IUser> {
    return this.model.findOne(id);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
