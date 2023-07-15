import { WebSocketServer } from "ws";
import { UpdateRooms, Player, ShipPos, AvailableType } from '../interface/type';

export function sendResponseForAllClients(response: UpdateRooms) {
  const server = new WebSocketServer({});
  console.log("Response: ", JSON.stringify(response));
  server.clients.forEach((client) => client.send(JSON.stringify(response)));
}

export function senderResponse(clientList: Player[], responseType: string, payload: any): void {
  clientList.forEach((client) => {
    let response: {};

    if (responseType === AvailableType.CreateGame) {
      const { idGame } = payload;
      response = {
        type: responseType,
        data: JSON.stringify({
          idGame,
          idPlayer: client.index,
        }),
        id: 0,
      };

      console.log(JSON.stringify(response));
      // ws!.send(JSON.stringify(response));
    }

    if (responseType === AvailableType.StartGame) {
      const position = payload.find((el: any) => el.indexPlayer === client.index) as ShipPos;
      response = {
        type: responseType,
        data: JSON.stringify({
          ...position.ships,
          currentPlayerIndex: position.indexPlayer,
        }),
        id: 0,
      };

      console.log(JSON.stringify(response));
      // ws!.send(JSON.stringify(response));
    }
  });
}