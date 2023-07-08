import  httpServer from './src/http_server/httpServer';
import  WsServer from './src/ws_server/WsServer';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer(HTTP_PORT);

console.log(`Start static ws server on the ${HTTP_PORT} port!`);
WsServer(WS_PORT);