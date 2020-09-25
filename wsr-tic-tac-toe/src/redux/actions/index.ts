// Describing ACTION NAMES

import { GAME_STATE } from '../types';

// CREATE
export const CREATE_BOARD = 'CREATE_BOARD';
export const GENERATE_WINNING_SCENARIOS = 'GENERATE_WINNING_SCENARIOS';
export const SELECT_SQUARE = 'SELECT_SQUARE';
export const SET_GAME_STATE = 'SET_GAME_STATE';
export const SET_CREATE_GAME_MODAL_STATE = 'SET_CREATE_GAME_MODAL_STATE';

// REMOVE
export const REMOVE_BOARD = 'REMOVE_BOARD';

// CLEAR
export const CLEAR_PLAYER_POSITIONS = 'CLEAR_PLAYER_POSITIONS';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export function setGameState(gameState: GAME_STATE) {
    return { type: SET_GAME_STATE, payload: gameState };
}
export function setIsCreateGameModalVisible(isVisible: boolean) {
    return { type: SET_CREATE_GAME_MODAL_STATE, payload: isVisible};
}
export function selectSquare(squareId: number, player: string) {
    return {
        type: SELECT_SQUARE,
        payload: {
            id: squareId,
            selectedBy: player,
        },
    };
}
export function generateWinningScenariosAction(boardSize: number) {
    return { type: GENERATE_WINNING_SCENARIOS, payload: boardSize };
}

export function createBoard(boardSize: number) {
    return { type: CREATE_BOARD, payload: boardSize };
}

export function clearBoard() {
    return { type: CLEAR_BOARD };
}
