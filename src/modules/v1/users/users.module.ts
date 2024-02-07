import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/commons/logging/logger.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
