import { Event } from './models/event.model';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = (): void => {
  Event.sync({ alter: isDev });
};

export default dbInit;
