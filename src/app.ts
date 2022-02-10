import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
import { errorCreator, errorHandler } from './helpers/error-handler';
import routes from './api/routes';

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
