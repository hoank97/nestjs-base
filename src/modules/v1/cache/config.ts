import * as redisStore from 'cache-manager-redis-store';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const RedisConfig = {
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
