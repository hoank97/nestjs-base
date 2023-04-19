import { ConfigModule } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
ConfigModule.forRoot({
  envFilePath: './.env',
});

export const OPTION_LOCAL: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_LOCAL_HOST,
  port: parseInt(process.env.DB_LOCAL_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/../migrations`,
  },
  synchronize: false,
};

export const OPTION_DOCKER: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_DOCKER_HOST,
  port: parseInt(process.env.DB_DOCKER_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/../migrations`,
  },
  synchronize: false,
};
