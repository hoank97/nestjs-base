import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { GoogleStrategy } from 'src/configs/oAuth2';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
