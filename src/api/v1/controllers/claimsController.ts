import { Request, Response, NextFunction } from 'express';
import admin from '../../../config/firebase';
import { AuthError } from '../errors/AuthError';

export const setClaims = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid, role } = req.body;
    if (!uid || !role) throw new AuthError('uid and role required');
    await admin.auth().setCustomUserClaims(uid, { role });
    return res.json({ message: 'Custom claims set', uid, role });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const user = await admin.auth().getUser(uid);
    return res.json(user);
  } catch (err) {
    next(err);
  }
};
