export class Socket {
  public static wss = undefined;
  constructor(server: any) {
    const WSServer = require('ws').Server;
    Socket.wss = new WSServer({
      server,
    });
  }
  public static message(result, req, verb: string) {
    if (result.status) {
      const message = { verb, data: result, action: req.body?.action };
      Socket.wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(message));
      });
    }
  }
}
