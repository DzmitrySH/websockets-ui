import WebSocket from "ws";
import { ErrorMsg } from '../interface/type';

export function errorMessges(ws: WebSocket) {
    ws.send(JSON.stringify({error: true, errorText: ErrorMsg.RequestType,}));
}