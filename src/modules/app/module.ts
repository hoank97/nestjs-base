import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddleWare } from 'src/middleware';
import { AuthModule } from '../v1/auth/module';
import { UsersModule } from '../v1/users/module';
import { AppController } from './controller';
import { AppService } from './service';
import { UploadModule } from '../v1/upload/module';
import { MailModule } from '../v1/mail/module';
import { BullModule } from '@nestjs/bull';
import { LOCAL_ENV } from 'src/commons/constants/variables.constants';
import { OPTION_DOCKER, OPTION_LOCAL } from 'src/configs';

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
