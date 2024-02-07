import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisConfig } from './cache.config';
import { RedisCacheService } from './cache.services';

@Module({
  imports: [CacheModule.register(RedisConfig)],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
