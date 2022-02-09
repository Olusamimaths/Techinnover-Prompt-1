import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

const errorHandler: ErrorRequestHandler = (
  error: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
};

const errorCreator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error: ErrorWithStatus = new Error('Not found');
  error.status = 400;
  next(error);
};

export { errorHandler, errorCreator };
