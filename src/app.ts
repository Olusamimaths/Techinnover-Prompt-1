import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { errorCreator, errorHandler } from './helpers/error-handler';
import routes from './api/routes';
import dbInit from './db/init';

dbInit();

const app: Express = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// create error
app.use(errorCreator);
// handle error
app.use(errorHandler);

export default app;
