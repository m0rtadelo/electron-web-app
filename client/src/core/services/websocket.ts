export class Websocket {
  constructor(url: string, cb) {
    const socket = new WebSocket(url);
    socket.addEventListener('message', (event) => {
      cb(JSON.parse(event.data));
    });
  }
}
