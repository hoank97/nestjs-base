import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddleWare } from 'src/middleware';
import { AuthModule } from '../v1/auth/auth.module';
import { UsersModule } from '../v1/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from '../v1/upload/upload.module';
import { MailModule } from '../v1/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { LOCAL_ENV } from 'src/constants/variables.constants';
import {
  OPTION_DOCKER,
  OPTION_LOCAL,
} from 'src/configs/database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === LOCAL_ENV ? OPTION_LOCAL : OPTION_DOCKER,
    ),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    UsersModule,
    UploadModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddleWare).forRoutes('*');
  }
}
