import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisConfig } from './config';
import { RedisCacheService } from './services';

@Module({
  imports: [CacheModule.register(RedisConfig)],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
