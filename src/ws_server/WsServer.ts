import { Server, WebSocketServer } from 'ws';
// import Game from '../game/index';

export default function wsServer (port: number) {
    const server = new WebSocketServer({ port });
  //  const game = new Game();

    server.on('listening', () => {
      console.log(`WebSocker server is listening on the ${port} port!`);
    });

    server.on('connection', (ws) => {
      ws.on('error', console.error);

      ws.on('message', (data) => {
        try {
          // game.messageWebsocket(ws, data.toString());
        } catch (error) {
          console.error(error);
        }
      });
    });
};