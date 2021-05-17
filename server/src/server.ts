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
  if (result.status) {
    const message = { verb: 'patch', data: result, action: req.body?.action };
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    });
  }
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
    console.log(`received: ${message}`);
    ws.send(JSON.stringify({
      answer: 42,
    }));
  });
});

server.listen(4500, function() {
  console.log(`http/ws server listening on ${4500}`);
});
