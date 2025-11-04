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

// Set custom claims: admin-only endpoint should protect this with authorize(['admin'])
export const setRole = async (req: Request, res: Response) => {
  try {
    const { uid, role } = req.body;
    if (!uid || !role) return res.status(400).json({ error: 'uid and role required' });
    await admin.auth().setCustomUserClaims(uid, { role });
    return res.status(200).json({ message: 'Custom claim set', uid, role });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to set claims', detail: err?.message });
  }
};
