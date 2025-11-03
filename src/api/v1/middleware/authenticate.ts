// src/api/v1/middleware/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import admin from '../../../config/firebase';
import { AuthError } from '../errors/AuthError';

export const authenticate = async (req: Request & { user?: any }, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AuthError('Authorization header missing');
    const token = authHeader.split(' ')[1];
    if (!token) throw new AuthError('Bearer token missing');
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new AuthError('Authentication failed'));
  }
};
