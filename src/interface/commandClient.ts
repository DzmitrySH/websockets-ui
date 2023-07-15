
export interface Register{
  type: "reg",
  data:{
    name: string,
    password: string,
  },
  id: number,
}

export interface CreateRom {
  type: "create_room",
  data: string,
  id: number,
}

export interface PlayerAddToRom{
  type: "add_player_to_room",
  data:{
    indexRoom: number,
  },
  id: number,
}

export interface AddChips {
  type: "add_ships",
  data:{
    gameId: number,
    ships:{
      position: {
        x: number,
        y: number,
      },
      direction: boolean,
      length: number,
      type: "small"|"medium"|"large"|"huge",
    } [],
    indexPlayer: number,
  },
  id: number,
}

export interface Attack {
  type: "attack",
  data:{
    gameID: number,
    x: number,
    y: number,
    indexPlayer: number,
  },
  id: number,
}

export interface randomAttack {
  type: "randomAttack",
  data: {
    gameID: number,
    indexPlayer: number,
  },
  id: number,
}