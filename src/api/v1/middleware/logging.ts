// src/api/v1/middleware/logging.ts
import { Request, Response, NextFunction } from 'express';
import logger from './../utils/logger';

export const loggingMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};
