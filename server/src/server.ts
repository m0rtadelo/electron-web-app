import 'dotenv/config';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import router from './routes';
import { handleMessage } from './handler';
import session from 'express-session';
import { Socket } from './ws/message';
import { getId } from './utils/uid';

const port = process.env.PORT || 4500;
const app = express();
app.use(express.json());
app.use(session({
  genid: () => uuidv4(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
function isAuthorized(req, res) {
  if (!req.session.user) {
    res.sendStatus(401);
    return false;
  }
  return true;
}
app.use('/login', router.login);
app.use((req, res, next) => !isAuthorized(req, res) || next());
app.use('/api', router.api);
app.use('/logout', router.logout);
const server = require('http').createServer();
new Socket(server);
server.on('request', app);

Socket.wss.on('connection', function connection(ws) {
  ws.id = getId();
  ws.on('message', function incoming(message) {
    handleMessage(Socket.wss, message, ws);
  });
});

server.listen(port, function() {
  console.log(`http/ws server listening on port: ${port}`);
});
