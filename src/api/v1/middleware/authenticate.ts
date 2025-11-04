import { Request, Response, NextFunction } from 'express';
import { auth } from '../../../config/firebase';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'Authorization header missing', timestamp: new Date().toISOString() });
  }
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Malformed Authorization header', timestamp: new Date().toISOString() });
  }
  const token = parts[1];
  try {
    const decoded = await auth.verifyIdToken(token);
    // decoded may have custom claims in decoded.role or decoded.firebase.claims
    req.user = decoded;
    return next();
  } catch (err: any) {
    // Provide safe error message
    return res.status(401).json({ error: 'Invalid or expired token', detail: err?.message, timestamp: new Date().toISOString() });
  }
};
