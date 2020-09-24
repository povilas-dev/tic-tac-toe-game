import {
    CREATE_BOARD,
    CLEAR_BOARD,
    GENERATE_WINNING_SCENARIOS,
    SELECT_SQUARE,
    SET_GAME_STATE,
} from '../actions';

export enum GAME_STATE {
  ONGOING,
  PLAYER1_WON,
  PLAYER2_WON,
  TIE,
}


// STATES
export interface BoardState {
    boardSize: number;
    created: Boolean;
    squares: Array<SquareState>;
    turnOrder: string;
    gameState: GAME_STATE;
}

export interface SquareState {
    id: number;
    selectedBy: string | null;
}

export interface AppState {
    board: BoardState;
    winningScenarios: Array<Array<number>>;
}

// ACTION TYPES

export interface CreateBoard {
    type: typeof CREATE_BOARD;
    payload: number;
}

export interface ClearBoard {
    type: typeof CLEAR_BOARD;
}

export interface GenerateWinningScenarios {
    type: typeof GENERATE_WINNING_SCENARIOS;
    payload: number;
}

export interface SelectSquare {
    type: typeof SELECT_SQUARE;
    payload: SquareState;
}

export interface SetGameState {
  type: typeof SET_GAME_STATE;
  payload: GAME_STATE;
}

export type WinningScenarioActionTypes = GenerateWinningScenarios;
export type BoardStateActionTypes = CreateBoard  | ClearBoard | SelectSquare | SetGameState;