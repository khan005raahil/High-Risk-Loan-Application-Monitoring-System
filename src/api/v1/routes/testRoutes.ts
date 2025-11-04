import { Router } from 'express';
const router = Router();

router.get('/error', (_req, res) => {
  // Example error to test global handler
  res.status(500).json({ error: 'Simulated server error', timestamp: new Date().toISOString() });
});

export default router;
