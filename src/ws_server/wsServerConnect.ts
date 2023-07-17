
import WebSocket from "ws";
import { randomBytes } from "crypto";
import { addClient, removeClient, createPlayer, deletePlayer, attackShips } from '../db/Dbset';
import { Request, AvailableType, ErrorMsg } from '../interface/type';
import { errorMessges } from '../util/errorMessges';
import { createRoom, addUserToRoom, addShips } from '../db/Dbset';

export default function wsServerConnect (ws: WebSocket) {
    const clientId: string = randomBytes(16).toString("hex");
    addClient({ clientId });
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
            createPlayer(ws, clientId, request);
            break;
          case AvailableType.CreateRoom:
            createRoom(clientId);  
            break;
          case AvailableType.AddUserToRoom:
            addUserToRoom(clientId, request)
            break;
          case AvailableType.AddShips:
            addShips(request);
            break;
          case AvailableType.Attack:
            attackShips(ws, clientId, request);
            break;
          case AvailableType.RandomAttack:
            // attackRandomShips();
            break;
          default:
            errorMessges(ws);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    });

    ws.on("close", () => {
      removeClient({ clientId });
      deletePlayer(clientId);
      console.log("Connection closed.");
    });
};