import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
import { errorCreator, errorHandler } from './helpers/error-handler';

const app: Express = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create error
app.use(errorCreator);
// handle error
app.use(errorHandler);

export default app;
