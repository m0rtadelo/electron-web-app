import express from 'express';
import { handleLogin } from '../handler';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req, res) => {
  const result = await handleLogin(req.body) || {};
  (req.session as any).user = result.data;
  return res.status(result.status || 500).send(result.data);
});

export default router;
