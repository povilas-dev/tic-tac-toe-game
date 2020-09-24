import { combineReducers } from 'redux';
import { winningScenariosReducer } from './winningScenariosReducer';
import { boardReducer } from './boardReducer';
import { AppState } from '../types';

export const rootReducer = combineReducers<AppState>({
    winningScenarios: winningScenariosReducer,
    board: boardReducer,
});
