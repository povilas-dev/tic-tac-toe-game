import { generateWinningScenarios } from '../utils/game-logic';

test('negative board sizes should return no winning scenarios', () => {
    expect(generateWinningScenarios(-10)).toEqual([]);
});

test('board size: 0 should return no winning scenarios', () => {
    expect(generateWinningScenarios(0)).toEqual([]);
});

test('board size: 1 should return one winning scenario', () => {
    expect(generateWinningScenarios(1)).toHaveLength(1);
});

test('board size: 2} should return 6 winning scenarios', () => {
    let testParam1 = 2;
    expect(generateWinningScenarios(testParam1)).toHaveLength(6);
});

test('board size: 47} should return 96 winning scenarios', () => {
    let testParam2 = 47;
    expect(generateWinningScenarios(testParam2)).toHaveLength(96);
});
test('board size: 2, should have 6 accurate winning scenarios', () => {
    let matrix6WinningScenarios: Array<Array<number>> = [
        [0, 1],
        [2, 3],
        [0, 2],
        [1, 3],
        [0, 3],
        [1, 2],
    ];
    expect(generateWinningScenarios(2)).toEqual(matrix6WinningScenarios);
});
