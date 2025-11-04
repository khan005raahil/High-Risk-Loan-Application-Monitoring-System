import { Router } from 'express';
import * as loansCtrl from '../controllers/loansController';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.post('/', authenticate, authorize(['officer','admin']), loansCtrl.createLoan);
router.get('/', authenticate, authorize(['viewer','officer','admin']), loansCtrl.getAllLoans);
router.get('/:id', authenticate, authorize(['viewer','officer','admin']), loansCtrl.getLoanById);
router.patch('/:id', authenticate, authorize(['officer','admin']), loansCtrl.updateLoan);
router.delete('/:id', authenticate, authorize(['admin']), loansCtrl.deleteLoan);

router.post('/:id/review', authenticate, authorize(['officer','admin']), loansCtrl.reviewLoan);
router.post('/:id/approve', authenticate, authorize(['admin','officer']), loansCtrl.approveLoan);

export default router;
