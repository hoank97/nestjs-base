import { config } from 'dotenv';
config();

export const AppConfig = {
  DockerConfig: {
    type: 'mysql',
    host: process.env.DB_LOCAL_HOST,
    port: parseInt(process.env.DB_LOCAL_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
    cli: {
      migrationsDir: `${__dirname}/migrations`,
    },
    synchronize: false,
  },
  RedisConfig: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: process.env.REDIS_TTL,
  },
  MongoDB: {
    uri: process.env.DB_URI,
    option: {
      authSource: 'admin',
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    },
  },
};

export const APPLICATION = 'Project Base';
export const DESCRIPTION = 'HoaNK';
export const FILE_SIZE = 1000000;
export const FILE_TYPE = 'image/jpeg';
export const LOCAL_ENV = 'local';
export const DOCKER_ENV = 'docker';
