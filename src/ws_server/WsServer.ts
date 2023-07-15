import { Server, WebSocketServer } from 'ws';

export default function wsServer (port: number) {
    const server = new WebSocketServer({ port });
    server.on('listening', () => {
      console.log(`WebSocker server is listening on the ${port} port!`);
    });

    server.on('connection', (ws) => {
      ws.on('error', console.error);

      ws.on('message', (data) => {
        try {
          // connectWebsocket(ws, data.toString());
        } catch (error) {
          console.error(error);
        }
      });
    });
};