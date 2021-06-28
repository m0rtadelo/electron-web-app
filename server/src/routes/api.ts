import express from 'express';
import { handleDelete, handlePatch, handlePost, handlePut } from '../handler';
import { Socket } from '../ws/message';
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req, res) => {
  const result = await handlePost(req.body) || {};
  return res.status(result.status || 500).send(result.data);
});

router.put('/', async (req, res) => {
  const result = await handlePut(req.body) || {};
  Socket.message(result, req, 'put');
  return res.status(result.status || 500).send(result.data);
});

router.delete('/', async (req, res) => {
  const result = await handleDelete(req.body) || {};
  Socket.message(result, req, 'delete');
  return res.status(result.status || 500).send(result.data);
});

router.patch('/', async (req, res) => {
  const result = await handlePatch(req.body) || {};
  Socket.message(result, req, 'patch');
  return res.status(result.status || 500).send(result.data);
});

export default router;
