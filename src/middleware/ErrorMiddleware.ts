import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../helper/errorHandler';

export const ErrorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Sorry, something went wrong please try again later!';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
