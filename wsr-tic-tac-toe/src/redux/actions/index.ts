// Describing ACTION NAMES

import { GAME_STATE } from "../types";

// CREATE
export const CREATE_BOARD = 'CREATE_BOARD';
export const GENERATE_WINNING_SCENARIOS = 'GENERATE_WINNING_SCENARIOS';
export const SELECT_SQUARE = 'SELECT_SQUARE';
export const SET_GAME_STATE = 'SET_GAME_STATE';

// REMOVE
export const REMOVE_BOARD = 'REMOVE_BOARD';

// CLEAR
export const CLEAR_PLAYER_POSITIONS = 'CLEAR_PLAYER_POSITIONS';
export const CLEAR_WINNING_SCENARIOS = 'CLEAR_WINNING_SCENARIOS';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export function setGameState(gameState: GAME_STATE) {
    return {type: SET_GAME_STATE, payload: gameState}
}
export function selectSquare(squareId: number, player: string) {
    return {
        type: SELECT_SQUARE,
        payload: {
            selected: true,
            id: squareId,
            selectedBy: player,
        },
    };
}
export function generateWinningConditions(boardSize: number) {
    return { type: GENERATE_WINNING_SCENARIOS, payload: boardSize };
}

export function clearWinningScenarios() {
    return { type: CLEAR_WINNING_SCENARIOS };
}

export function createBoard(boardSize: number) {
    return { type: CREATE_BOARD, payload: boardSize };
}

export function removeBoard() {
    return { type: REMOVE_BOARD };
}

export function clearBoard() {
    return { type: CLEAR_BOARD };
}
