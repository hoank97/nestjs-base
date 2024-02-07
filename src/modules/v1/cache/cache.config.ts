import * as redisStore from 'cache-manager-redis-store';
import { config } from 'dotenv';
config();

export const RedisConfig = {
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
