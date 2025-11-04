import { Router } from 'express';
import * as controller from '../controllers/claimsController';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.post('/set', authenticate, authorize(['admin']), controller.setClaims);
router.get('/:uid', authenticate, authorize(['admin','auditor']), controller.getUser);

export default router;
