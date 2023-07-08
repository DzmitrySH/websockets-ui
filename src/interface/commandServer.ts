export interface RegisterOk {
  type: "reg",
  data: {
    name: number,
    index: number,
    error: boolean,
    errorText: string,
  },
  id: number,
}

export interface UpdateWinner{
  type: "update_winners",
  data: [ {
    name: string,
    wins: number,
    }
  ],
  id: number,
}

export interface CreateGame{
  type: "create_game",
  data: {
    idGame: number,
    idPlayer: number,
  },
  id: number,
}

export interface UpdateRoom {
  type: "update_room",
  data: { [ {
    roomId: number,
    roomUsers: [
    {
      name: string,
      index: number,
    }
        ],
      },
    ]
  },
  id: number,
}

export interface  StartGame{
  type: "start_game",
  data: {
    ships:[ {
        position: {
          x: number,
          y: number,
        },
        direction: boolean,
        length: boolean,
        type: "small"|"medium"|"large"|"huge",
      }
    ],
    currentPlayerIndex: number,
  },
  id: number,
}

export interface Attack{
  type: "attack",
  data: {
    position: {
      x: number,
      y: number,
    },
    currentPlayer: number,
    status: "miss"|"killed"|"shot",
  },
  id: number,
}

export interface Turn{
  type: "turn",
  data: {
    currentPlayer: number,
  },
  id: number,
}

export interface Finish{
  type: "finish",
  data: {
    winPlayer: number,
  },
  id: number,
}