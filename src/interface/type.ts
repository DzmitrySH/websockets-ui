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
  clientId: string;
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
  shipsPos: ShipPos[];
};

export type Winner = {
  playerId: number;
  name: string;
  wins: number;
}

export type AttackData = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: string;
}

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

export type Position = {
  x: number;
  y: number;
}

export interface Cell extends Position {
  killed: boolean;
}

export interface ShipCells extends Ship {
  cells: Cell[];
  killed: boolean;
}

export enum StatusAttack {
  Miss = "miss",
  Killed = "killed",
  Shot = "shot",
}

export enum ShipType {
  small = 'small',
  medium = 'medium',
  large = 'large',
  huge = 'huge',
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

export enum ErrorMsg {
  RequestType = 'Invalid request type',
  RequestBody = 'invalid request body',
}
