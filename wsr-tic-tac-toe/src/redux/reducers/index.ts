import {
    WinningScenarioActionTypes,
    BoardState,
    BoardStateActionTypes,
    SquareState,
    GAME_STATE,
} from '../types';
import {
    CLEAR_WINNING_SCENARIOS,
    CREATE_BOARD,
    REMOVE_BOARD,
    GENERATE_WINNING_SCENARIOS,
    SELECT_SQUARE,
    CLEAR_BOARD,
    SET_GAME_STATE,
} from '../actions';
import { combineReducers } from 'redux';
const initialWinningScenariosState: Array<Array<number>> = [];

export function winningScenariosReducer(
    state = initialWinningScenariosState,
    action: WinningScenarioActionTypes
) {
    switch (action.type) {
        case CLEAR_WINNING_SCENARIOS: {
            return initialWinningScenariosState; // return initialWinningScenariosState
        }
        case GENERATE_WINNING_SCENARIOS: {
            let boardSize = action.payload;
            let WSh: Array<Set<number>> = []; // array of horizontal winning sets
            let WSv: Array<Set<number>> = []; // array of vertical winning sets
            for (let i: number = 0; i < boardSize; i++) {
                let tempSet = new Set<number>();
                for (let j: number = 0; j < boardSize; j++) {
                    tempSet.add(boardSize * i + j);
                }
                WSh = [...WSh, tempSet];
            }

            for (let i: number = 0; i < boardSize; i++) {
                let tempSet = new Set<number>();
                for (let j: number = 0; j < boardSize; j++) {
                    tempSet.add(boardSize * j + i);
                }
                WSv = [...WSv, tempSet];
            }

            let diagonalSet1 = new Set();
            let diagonalSet2 = new Set();
            for (let i = 0; i < boardSize; i++) {
                diagonalSet1.add(i * boardSize + i);
                diagonalSet2.add((i + 1) * (boardSize - 1));
            }
            let winningScenarios = [];
            winningScenarios = [
                ...WSh.map((set) => Array.from(set)),
                ...WSv.map((set) => Array.from(set)),
                Array.from(diagonalSet1),
                Array.from(diagonalSet2),
            ];
            return [...winningScenarios];
        }
        default:
            return state;
    }
}

const initialBoardState: BoardState = {
    boardSize: 0,
    created: false,
    squares: [],
    turnOrder: 'player1',
    gameState: GAME_STATE.ONGOING
};

export function boardReducer(state = initialBoardState, action: BoardStateActionTypes) {
    switch (action.type) {
        case CREATE_BOARD: {
            let boardSize = action.payload;
            let initializedSquares: SquareState[] = [];
            // let squares: SquareState[][] = [];
            for (let i: number = 0; i < boardSize * boardSize; i++) {
                initializedSquares = [
                    ...initializedSquares,
                    { selected: false, id: i, selectedBy: '' },
                ]; // creating a 1D array of squares with {selected: false, id: 0,...,boardSize}
            }
            return {
                ...state,
                boardSize: boardSize,
                squares: initializedSquares,
                created: true,
            };
        }
        case REMOVE_BOARD: {
            return initialBoardState; // return initialBoardState
        }
        case CLEAR_BOARD: { // kinda unclear how I should do this with {...state,...} and not Object.assign (though the end result should be the same)
            return Object.assign(
                {},
                state,
                { turnOrder: 'player1' },
                { gameState: GAME_STATE.ONGOING},
                {
                    squares: state.squares.map((square: SquareState) => {
                        if (square.selected)
                            return { ...square, selected: false, selectedBy: false };
                        else return square;
                    }),
                }
            );
        }
        case SELECT_SQUARE: {
            return Object.assign(
                {},
                state,
                { turnOrder: action.payload.selectedBy === 'player1' ? 'player2' : 'player1' },
                {
                    squares: state.squares.map((square: SquareState) => {
                        if (square.id !== action.payload.id) return square;
                        else return { ...square, ...action.payload };
                    }),
                }
            );
        }
        case SET_GAME_STATE: {
          return {...state, gameState: action.payload}
        }
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    winningScenarios: winningScenariosReducer,
    board: boardReducer,
});
