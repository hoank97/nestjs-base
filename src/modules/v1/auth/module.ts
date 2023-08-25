import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './entities/model';
import { RedisCacheModule } from '../cache/module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    RedisCacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
