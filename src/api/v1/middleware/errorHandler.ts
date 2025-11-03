import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/BaseError';
import logger from './../utils/logger';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BaseError) {
    logger.error(err.message, { stack: err.stack });
    return res.status(err.statusCode).json({
      error: err.message,
      status: err.statusCode,
      timestamp: new Date().toISOString(),
    });
  }
  // Unexpected error
  logger.error('Unexpected error', { stack: err.stack || err });
  res.status(500).json({ error: 'Internal Server Error', timestamp: new Date().toISOString() });
};
