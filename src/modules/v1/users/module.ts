import { Module } from '@nestjs/common';
import { UsersService } from './service';
import { UsersController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import UserRepository from './repository';
import { LoggerModule } from 'src/commons/logging/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
