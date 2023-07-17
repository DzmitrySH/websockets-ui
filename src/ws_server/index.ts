import { WebSocketServer } from 'ws';
import 'dotenv/config';

const WS_PORT = process.env.WS_PORT || 3000;
export const wbsckServer = new WebSocketServer({ port: WS_PORT as number });
wbsckServer.on('listening', () => {
  console.log(`WebSocker server is listening on the ${WS_PORT} port!`);
});