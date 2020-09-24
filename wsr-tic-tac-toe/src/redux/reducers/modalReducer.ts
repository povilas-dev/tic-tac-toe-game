import { CreateGameModalActionTypes } from '../types';
import { SET_CREATE_GAME_MODAL_STATE } from '../actions';

const initialCreateGameModalState: boolean = false;

export function createGameModalReducer(
    state = initialCreateGameModalState,
    action: CreateGameModalActionTypes
): boolean {
    switch (action.type) {
        case SET_CREATE_GAME_MODAL_STATE: {
            return action.payload;
        }
        default:
            return state;
    }
}
