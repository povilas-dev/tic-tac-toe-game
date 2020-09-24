import { WinningScenarioActionTypes } from '../types';
import { GENERATE_WINNING_SCENARIOS } from '../actions';
import { generateWinningScenarios } from '../../utils/game-logic';

const initialWinningScenariosState: Array<Array<number>> = [];

export function winningScenariosReducer(
    state = initialWinningScenariosState,
    action: WinningScenarioActionTypes
): Array<Array<number>> {
    switch (action.type) {
        case GENERATE_WINNING_SCENARIOS: {
            let boardSize = action.payload;
            return generateWinningScenarios(boardSize);
        }
        default:
            return state;
    }
}
