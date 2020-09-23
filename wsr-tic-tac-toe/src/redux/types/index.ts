import {
    CREATE_BOARD,
    CLEAR_WINNING_SCENARIOS,
    REMOVE_BOARD,
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
export interface WinningScenariosState {
    conditions: Array<Array<number>>;
}

export interface BoardState {
    boardSize: number;
    created: Boolean;
    squares: Array<SquareState>;
    turnOrder: string;
    gameState: GAME_STATE;
}

export interface SquareState {
    id: number;
    selected: boolean;
    selectedBy: string;
}

export interface AppState {
    board: BoardState;
    winningScenarios: Array<Array<number>>;
}

// ACTION TYPES

export interface ClearWinningScenarios {
    type: typeof CLEAR_WINNING_SCENARIOS;
    payload: [];
}

export interface CreateBoard {
    type: typeof CREATE_BOARD;
    payload: number;
}

export interface RemoveBoard {
    type: typeof REMOVE_BOARD;
    payload: BoardState;
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

export type WinningScenarioActionTypes = ClearWinningScenarios | GenerateWinningScenarios;
export type BoardStateActionTypes = CreateBoard | RemoveBoard | ClearBoard | SelectSquare | SetGameState;
