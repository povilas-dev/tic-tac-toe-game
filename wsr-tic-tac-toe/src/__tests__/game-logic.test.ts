import { generateWinningScenarios } from '../utils/game-logic';

test('negative board sizes should return no winning scenarios', () => {
    expect(generateWinningScenarios(-10)).toEqual([]);
});

test('board size: 0 should return no winning scenarios', () => {
    expect(generateWinningScenarios(0)).toEqual([]);
});

test('board size: 1 should return one winning scenario', ()=> {
    expect(generateWinningScenarios(1)).toHaveLength(1);
})

test('board size: n (n>1) should return n*2+2 winning scenarios. (n=[2,47])', ()=>{
    let testParam1 = 2;
    let testParam2 = 47;
    expect(generateWinningScenarios(testParam1)).toHaveLength(testParam1*2+2);
    expect(generateWinningScenarios(testParam2)).toHaveLength(testParam2*2+2);
})