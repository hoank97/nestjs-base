import { Module } from '@nestjs/common';
import { LoggingModule } from 'src/commons/logging/logger.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]),
    LoggingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
