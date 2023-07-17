import httpServer from './src/http_server/httpServer';
import wsServerConnect from './src/ws_server/wsServerConnect';
import { wbsckServer } from './src/ws_server/index';
import 'dotenv/config';

const HTTP_PORT = process.env.HTTP_PORT || 8181;

httpServer(HTTP_PORT as number);
wbsckServer.on('connection', wsServerConnect);