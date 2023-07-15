import WebSocket from "ws";

export type Request = {
  type: string;
  data: string;
  id: string;
};

export type Player = {
  name: string;
  password?: string;
  index: string;
  ws?: WebSocket;
};

export type DbsetPlayer = Player[];

export type PlayerBody = {
  name: string;
  password: string;
};

export type Client = {
  clientConnectionId: string;
};

export type Room = {
  roomId: string;
  roomUsers: Player[] | null;
  game: Game;
};

export type UpdateRooms = {
  type: string;
  data: string;
  id: number;
};

export type Game = {
  idGame: number | string;
  shipsPositions: ShipPos[];
};

export type ShipPos = {
  ships: Ships;
  indexPlayer: string;
};

export type Ships = Ship[];

export type Ship = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: ShipType;
};

export enum ShipType {
  small,
  medium,
  large,
  huge,
}

export enum AvailableType {
  Reg = 'reg',
  CreateRoom = 'create_room',
  UpdateRoom = 'update_room',
  AddUserToRoom = 'add_user_to_room',
  CreateGame = 'create_game',
  AddShips = 'add_ships',
  StartGame = 'start_game',
  Turn = 'turn',
  Attack = 'attack',
  RandomAttack = 'randomAttack',
  Finish = 'finish',
  UpdateWinners = 'update_winners',
}
