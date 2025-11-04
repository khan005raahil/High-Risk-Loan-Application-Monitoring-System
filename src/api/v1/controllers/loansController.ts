import { Request, Response } from 'express';
import logger from './../utils/logger';
export const createLoan = async (req: Request, res: Response) => {
  return res.status(201).json({ id: 'loan_1', status: 'created', body: req.body });
};

export const getAllLoans = async (_req: Request, res: Response) => {
  return res.json([{ id: 'loan_1', status: 'retrived' }]);
};

export const getLoanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({ id, status: 'retrived' });
};

export const updateLoan = async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({ id, ...req.body, status: 'updated' });
};

export const deleteLoan = async (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info(`Loan ${id} deleted`);
  return res.status(204).send();
};

export const reviewLoan = async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({ id, action: 'reviewed' });
};

export const approveLoan = async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({ id, action: 'approved' });
};
