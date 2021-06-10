import express from 'express';
import { handlePost, handlePut, handleDelete, handlePatch, handleMessage } from './handler';
const app = express();
app.use(express.json());

function message(result, req, verb: string) {
  if (result.status) {
    const message = { verb, data: result, action: req.body?.action };
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    });
  }
}
app.post('/api', async (req, res) => {
  const result = await handlePost(req.body) || {};
  return res.status(result.status || 500).send(result.data);
});
app.put('/api', async (req, res) => {
  const result = await handlePut(req.body) || {};
  message(result, req, 'put');
  return res.status(result.status || 500).send(result.data);
});
app.delete('/api', async (req, res) => {
  const result = await handleDelete(req.body) || {};
  message(result, req, 'delete');
  return res.status(result.status || 500).send(result.data);
});
app.patch('/api', async (req, res) => {
  const result = await handlePatch(req.body) || {};
  message(result, req, 'patch');
  return res.status(result.status || 500).send(result.data);
});

const WSServer = require('ws').Server;
const server = require('http').createServer();

const wss = new WSServer({
  server,
});

server.on('request', app);

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    handleMessage(wss, message);
  });
});

server.listen(4500, function() {
  console.log(`http/ws server listening on ${4500}`);
});
