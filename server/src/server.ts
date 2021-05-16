import express from 'express';
import { handlePost, handlePut, handleDelete, handlePatch } from './handler';
const app = express();
app.use(express.json());

app.post('/api', async (req, res) => {
  const result = await handlePost(req.body) || {};
  return res.status(result.status || 500).send(result.data);
});
app.put('/api', async (req, res) => {
  const result = await handlePut(req.body) || {};
  return res.status(result.status || 500).send(result.data);
});
app.delete('/api', async (req, res) => {
  const result = await handleDelete(req.body) || {};
  return res.status(result.status || 500).send(result.data);
});
app.patch('/api', async (req, res) => {
  const result = await handlePatch(req.body) || {};
  return res.status(result.status || 500).send(result.data);
});
app.listen(4500, () => {
  console.log('listen at port 4500');
});
