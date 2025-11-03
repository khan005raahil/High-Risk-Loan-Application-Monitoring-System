import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../errors/AuthError';

export const authorize = (roles: string[] = []) => {
  return (req: Request & { user?: any }, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new AuthError('Not authenticated'));
    const userRole = user.role;
    if (!userRole) return next(new AuthError('No role assigned to user'));
    if (!roles.includes(userRole)) return next(new AuthError('Forbidden: insufficient role'));
    return next();
  };
};
