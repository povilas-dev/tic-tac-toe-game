export function generateWinningScenarios(boardSize: number) {
    if (boardSize <= 0) {
        return [];
    }
    if (boardSize === 1) {
        return [[0]]; // there is only one possible winning scenario
    }
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

    let diagonalSet1: Set<number> = new Set();
    let diagonalSet2: Set<number> = new Set();
    for (let i = 0; i < boardSize; i++) {
        diagonalSet1.add(i * boardSize + i);
        diagonalSet2.add((i + 1) * (boardSize - 1));
    }
    let winningScenarios: number[][] = [];
    winningScenarios = [
        ...WSh.map((set) => Array.from(set)),
        ...WSv.map((set) => Array.from(set)),
        Array.from(diagonalSet1),
        Array.from(diagonalSet2),
    ];
    return [...winningScenarios];
}

export function checkIfPlayerWon(
    playerSelectedSquares: Array<number>,
    winningScenarios: Array<Array<number>>
) {
    let result: boolean = false;
    winningScenarios.forEach((winningScenario: Array<number>) => {
        if (winningScenario.every((el: number) => playerSelectedSquares.includes(el))) {
            result = true;
        }
    });
    return result;
}
