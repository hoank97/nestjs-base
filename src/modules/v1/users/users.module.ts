import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import UserRepository from './users.repository';
import { LoggerModule } from 'src/logging/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}