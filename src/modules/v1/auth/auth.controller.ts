import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RedisCacheService } from '../cache/cache.services';
import { randomCode } from 'src/commons/ultis';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cacheService: RedisCacheService,
  ) {}

  @Post()
  test(@Body() body: any) {
    return this.cacheService.set('key', randomCode(6));
  }

  @Get()
  get() {
    return this.cacheService.get('key');
  }
}
