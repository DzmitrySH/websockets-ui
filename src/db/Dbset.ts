import WebSocket, { WebSocketServer }from "ws";
import { senderResponse } from "../websocket/senderResponse";
import {
  Client,
  Room,
  Player,
  Request,
  Ships,
  ShipPos,
  DbsetPlayer,
  UpdateRooms,
  AvailableType,
} from '../interface/type';


let clients: Array<Client> = [];
let rooms: Room[] = [];
let players: DbsetPlayer = [];

export function addClient(client: Client): void {
  clients.push(client);
}

export function removeClient(client: Client): void {
  clients = clients.filter((index) => {
    if (index.clientId !== client.clientId) return index;
  });
}

export function getPlayerId(id: string): Player | void {
  const player = players.find((player) => player.index === id);
  return player;
}

function responseAll(response: UpdateRooms) {
  const server = new WebSocketServer({});
  console.log("Response: ", JSON.stringify(response));
  server.clients.forEach((client) => client.send(JSON.stringify(response)));
}

export function updateRoomAll(): void {
  const response = {
    type: AvailableType.UpdateRoom,
    data: JSON.stringify(
      rooms.map((room: Room) => {
        return { roomId: room.roomId, roomUsers: room.roomUsers }
      })
    ),
    id: 0,
  };
  responseAll(response);
}

export function createRoom(clienId: string) {
  const { name, index } = getPlayerId(clienId) as Player;
  const newRoom: Room = {
    roomId: clienId,
    roomUsers: [ { name, index, } ],
    game: { idGame: clienId, shipsPos: [] }
  };

  rooms.push(newRoom as Room);
  updateRoomAll();
}


function deleteRoom(clientId: string): void {
  rooms = rooms.filter((room) => {
    if (room.roomId !== clientId) return room;
  });
  updateRoomAll();
}

function playerDeleteRom(id: string) {
  rooms.map((room) => {
    if (room.roomUsers?.some((user) => user.index === id)) {
      room.roomUsers = room.roomUsers.filter((user) => {
        if (user.index !== id) return user;
      });
    }
  });
  deleteRoom(id);
}

function createGame(indexRoom: string): void {
  const idx = rooms.findIndex((room) => room.roomId === indexRoom);
  senderResponse(rooms[idx]?.roomUsers as Player[], AvailableType.CreateGame, { idGame: indexRoom });
}

export function addUserToRoom(clientId: string, request: Request): void {
  const { indexRoom } = JSON.parse(request.data);
  const { name, index } = getPlayerId(clientId) as Player;
  rooms.map((room, idx) => {
    if (room.roomId === indexRoom) {
      if (rooms[idx]?.roomUsers?.some((user) => user.index === index)) return;
        rooms[idx]?.roomUsers?.push({ name, index });
        deleteRoom(clientId);
    }
    if (rooms[idx]?.roomUsers?.length === 2) {
      createGame(room.roomId);
    }
  });
}

function startGame(roomId: string): void {
  const room = rooms.find((room) => room.roomId === roomId) as Room;
  const { roomUsers } = room;
  const shipsPos = room.game?.shipsPos as ShipPos[];
  senderResponse(roomUsers as Player[], AvailableType.StartGame, shipsPos as ShipPos[]);
}

export function addShips(request: Request): void {
  const requestShip = JSON.parse(request.data);
  const { gameId, indexPlayer } = requestShip;

  const ships: Ships = [...requestShip.ships] as Ships;
  const roomIndex: number | undefined = rooms.findIndex((room) => room.game?.idGame === gameId);

  rooms[roomIndex]?.game.shipsPos.push({
    ships: [...ships],
    indexPlayer,
  })

  if (rooms[roomIndex]?.game.shipsPos.length === 2) {
    const roomId = rooms[roomIndex]?.roomId;
    startGame(roomId as string);
  }
}

