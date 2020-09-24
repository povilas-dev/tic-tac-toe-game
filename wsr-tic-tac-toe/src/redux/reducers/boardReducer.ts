import { BoardState, GAME_STATE, BoardStateActionTypes, SquareState } from '../types';
import { CREATE_BOARD, CLEAR_BOARD, SELECT_SQUARE, SET_GAME_STATE } from '../actions';

const initialBoardState: BoardState = {
    boardSize: 0,
    created: false,
    squares: [],
    turnOrder: 'player1',
    gameState: GAME_STATE.ONGOING,
};

export function boardReducer(state = initialBoardState, action: BoardStateActionTypes) {
    switch (action.type) {
        case CREATE_BOARD: {
            let boardSize = action.payload;
            let initializedSquares: SquareState[] = [];
            for (let i: number = 0; i < boardSize * boardSize; i++) {
                initializedSquares.push({ id: i, selectedBy: null }); // creating a 1D array of squares with {selected: false, id: 0,...,boardSize}
            }
            return {
                ...initialBoardState,
                boardSize: boardSize,
                squares: initializedSquares,
                created: true,
            };
        }
        case CLEAR_BOARD: {
            return {
                ...state,
                turnOrder: 'player1',
                gameState: GAME_STATE.ONGOING,
                squares: [
                    ...state.squares.map((square: SquareState) => {
                        if (square.selectedBy) return { ...square, selectedBy: null };
                        else return square;
                    }),
                ],
            };
        }
        case SELECT_SQUARE: {
            return {
                ...state,
                turnOrder: action.payload.selectedBy === 'player1' ? 'player2' : 'player1',
                squares: [
                    ...state.squares.map((square: SquareState) => {
                        if (square.id !== action.payload.id) return square;
                        else return { ...square, ...action.payload };
                    }),
                ],
            };
        }
        case SET_GAME_STATE: {
            return { ...state, gameState: action.payload };
        }
        default:
            return state;
    }
}
