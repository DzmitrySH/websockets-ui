import httpServer from './src/http_server/httpServer';
import wsServer from './src/ws_server/wsServer';

// const HTTP_PORT = 8181;
// const WS_PORT = 3000;
const WS_PORT = process.env.WS_PORT || 3000;
const HTTP_PORT = process.env.HTTP_PORT || 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer(HTTP_PORT as number);

console.log(`Start static ws server on the ${WS_PORT} port!`);
wsServer(WS_PORT as number);