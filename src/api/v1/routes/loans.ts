import { Router } from 'express';
import * as controller from '../controllers/loansController';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.post('/', authenticate, authorize(['officer','admin']), controller.createLoan);
router.get('/', authenticate, authorize(['viewer','officer','admin','auditor']), controller.getAllLoans);
router.get('/:id', authenticate, authorize(['viewer','officer','admin','auditor']), controller.getLoanById);
router.patch('/:id', authenticate, authorize(['officer','admin']), controller.updateLoan);
router.delete('/:id', authenticate, authorize(['admin']), controller.deleteLoan);
router.post('/:id/review', authenticate, authorize(['officer']), controller.reviewLoan);
router.post('/:id/approve', authenticate, authorize(['admin','officer']), controller.approveLoan);

export default router;
