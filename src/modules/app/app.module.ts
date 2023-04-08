import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OPTION } from 'src/configs/database/typeorm.config';
import { MiddleWare } from 'src/middleware';
import { AuthModule } from '../v1/auth/auth.module';
import { UsersModule } from '../v1/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from '../v1/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(OPTION),
    AuthModule,
    UsersModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddleWare).forRoutes('*');
  }
}
