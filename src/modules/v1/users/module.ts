import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/commons/logging/logger.module';
import { UsersController } from './controller';
import { UsersService } from './service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
