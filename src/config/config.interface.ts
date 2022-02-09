import { Dialect } from 'sequelize';

export interface IConfig {
  DB_NAME: string;
  DB_USER: string;
  DB_HOST: string;
  DB_DRIVER: Dialect;
  DB_PASSWORD: string;
}
