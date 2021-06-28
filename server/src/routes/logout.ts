import express from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();

router.all('/', async (req, res) => {
  const result = { status: 200, data: { logout: true } };
  (req.session as any).user = undefined;
  return res.status(result.status || 500).send(result.data);
});

export default router;
