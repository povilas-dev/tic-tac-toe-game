import {
  PlayerActionTypes,
  PlayerState,
  PlayerManagerState,
  WinningScenariosState,
  WinningScenarioActionTypes,
  BoardState,
  BoardStateActionTypes,
} from "../types";
import {
  ADD_PLAYER1_MOVE,
  ADD_PLAYER2_MOVE,
  ADD_WINNING_SCENARIO,
  CLEAR_WINNING_SCENARIOS,
  CREATE_BOARD,
  REMOVE_BOARD,
} from "../actions";
import { combineReducers } from "redux";

const initialPlayerManagerState: PlayerManagerState = {
  player1: { selectedSquares: [] },
  player2: { selectedSquares: [] },
  turnOrder: "",
};

export function playerManagerReducer(
  state = initialPlayerManagerState,
  action: PlayerActionTypes
): PlayerManagerState {
  switch (action.type) {
    case ADD_PLAYER1_MOVE: {
      return { ...state, ...action.payload };
    }
    case ADD_PLAYER2_MOVE: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

const initialWinningScenariosState: WinningScenariosState = {
  winningScenarios: [],
};

export function winningScenariosReducer(
  state = initialWinningScenariosState,
  action: WinningScenarioActionTypes
) {
  switch (action.type) {
    case ADD_WINNING_SCENARIO: {
      return { ...state, ...action.payload };
    }
    case CLEAR_WINNING_SCENARIOS: {
      return { state, ...action.payload }; // return initialWinningScenariosState
    }
    default:
      return state;
  }
}

const initialBoardState: BoardState = {
  boardSize: 0,
  created: false,
  empty: true,
};

export function boardReducer(
  state = initialBoardState,
  action: BoardStateActionTypes
) {
  switch (action.type) {
    case CREATE_BOARD: {
      return { ...state, ...action.payload };
    }
    case REMOVE_BOARD: {
      return { state, ...action.payload }; // return initialBoardState
    }
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  playerManager: playerManagerReducer,
  winningScenarios: winningScenariosReducer,
  board: boardReducer,
});
