import { IConfig } from './config.interface';
import { Dialect } from 'sequelize';

const CONFIG = {
  development: {
    DB_NAME: process.env.DB_NAME as string,
    DB_USER: process.env.DB_USER as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_DRIVER: process.env.DB_DRIVER as Dialect,
    DB_PASSWORD: process.env.DB_PASSWORD as string
  }
};

const environment = process.env.NODE_ENV;

let config: IConfig = { ...CONFIG.development };

if (environment === 'development') {
  config = {
    ...CONFIG.development
  };
}

export { config };
