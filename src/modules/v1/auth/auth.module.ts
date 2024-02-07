import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisCacheModule } from '../cache/cache.module';
import { LoggingModule } from 'src/commons/logging/logger.module';
import { User, UserSchema } from '../users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RedisCacheModule,
    LoggingModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
