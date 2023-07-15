import { Server, WebSocketServer, WebSocket } from 'ws';
import { randomBytes } from "crypto";
import { addClient, removeClient  } from '../db/Dbset';
import { Request, AvailableType, ErrorMsg } from '../interface/type';
import { errorMessges } from '../util/errorMessges';

export default function wsServer (port: number) {
    const clientId: string = randomBytes(16).toString("hex");
    addClient({ clientId });

    const server = new WebSocketServer({ port });

    server.on('listening', () => {
      console.log(`WebSocker server is listening on the ${port} port!`);
    });

    server.on('connection', (ws) => {
      ws.on('error', console.error);
      ws.on('message', (data: string) => {
        const request: Request = JSON.parse(data);
        console.log("Request: ", request);
        const { type } = request;

        if (!Object.values(AvailableType).some((value) => value === type)) {
          console.log(ErrorMsg.RequestType);
          errorMessges(ws);
          return;
        }
        try {
          switch (type) {
            case AvailableType.Reg:
              
              break;
            case AvailableType.CreateRoom:
              
              break;
            case AvailableType.AddUserToRoom:
              
              break;
            case AvailableType.AddShips:
              
              break;
            case AvailableType.Attack:
              
              break;
            case AvailableType.RandomAttack:
              
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(error);
        }
      });

      ws.on("close", () => {
        removeClient({ clientId });
        console.log("Connection closed.");
      });
    });
};