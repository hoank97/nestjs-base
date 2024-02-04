import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddleWare } from 'src/middleware';
import { AuthModule } from '../v1/auth/module';
import { UsersModule } from '../v1/users/module';
import { AppController } from './controller';
import { AppService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from './config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductsModule } from '../v1/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(AppConfig.MongoDB.uri, AppConfig.MongoDB.option),
    AuthModule,
    UsersModule,
    ProductsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddleWare).forRoutes('*');
  }
}
