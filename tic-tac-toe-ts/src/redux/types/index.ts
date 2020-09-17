import { ADD_PLAYER1_MOVE, ADD_PLAYER2_MOVE, CREATE_BOARD, CLEAR_WINNING_SCENARIOS, ADD_WINNING_SCENARIO, REMOVE_BOARD, CLEAR_BOARD } from "../actions";

// STATES
export interface PlayerState {
  selectedSquares: number[];
}

export interface PlayerManagerState {
  player1: PlayerState;
  player2: PlayerState;
  turnOrder: String;
}

export interface WinningScenariosState {
  winningScenarios: Array<Set<number>>;
}

export interface BoardState {
    boardSize: number;
    created: Boolean;
    empty: Boolean; // this one might be unnecessary
}

// ACTION TYPES
export interface Player1Move {
  type: typeof ADD_PLAYER1_MOVE;
  payload: PlayerState; // square identification number on the board
}

export interface Player2Move {
  type: typeof ADD_PLAYER2_MOVE;
  payload: PlayerState; // square identification number on the board
}

export interface AddWinningScenario {
    type: typeof ADD_WINNING_SCENARIO;
    payload: WinningScenariosState;
}

export interface ClearWinningScenarios {
    type: typeof CLEAR_WINNING_SCENARIOS
    payload: []
}

export interface CreateBoard {
    type: typeof CREATE_BOARD;
    payload: BoardState;
}

export interface RemoveBoard {
    type: typeof REMOVE_BOARD;
    payload: BoardState;
}

export interface ClearBoard {
    type: typeof CLEAR_BOARD;
}

export type PlayerActionTypes = Player1Move | Player2Move;
export type WinningScenarioActionTypes = AddWinningScenario | ClearWinningScenarios;
export type BoardStateActionTypes = CreateBoard | RemoveBoard | ClearBoard;