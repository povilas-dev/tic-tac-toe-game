let winningSets = [];
let player1Set = new Set();
let player2Set = new Set();
let turnOrder = "Player1";

function createGame(boardSize) {
  clearBoard();
  resetGame();
  console.log(`Starting game with ${boardSize}x${boardSize}`);
  generateBoard(boardSize);
  let WSh = []; // array of horizontal winning sets
  let WSv = []; // array of vertical winning sets
  for (i = 0; i < boardSize; i++) {
    let tempSet = new Set();
    for (j = 1; j <= boardSize; j++) {
      tempSet.add(boardSize * i + j);
    }
    WSh.push(tempSet);
  }

  for (i = 1; i <= boardSize; i++) {
    let tempSet = new Set();
    for (j = 0; j < boardSize; j++) {
      tempSet.add(boardSize * j + i);
    }
    WSv.push(tempSet);
  }

  let diagonalSet1 = new Set();
  let diagonalSet2 = new Set();
  for (i = 0; i < boardSize; i++) {
    diagonalSet1.add(i * boardSize + i + 1);
    diagonalSet2.add((i + 1) * boardSize - i);
  }
  winningSets = [];
  WSh.forEach((set) => winningSets.push(set));
  WSv.forEach((set) => winningSets.push(set));
  winningSets.push(diagonalSet1);
  winningSets.push(diagonalSet2);
  // console.log(diagonalSet1);
  // console.log(diagonalSet2);
  // console.log(WSh);
  // console.log(WSv);
}

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

function generateBoard(boardSize) {
  for (i = 0; i < boardSize; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.id = `row${i}`;

    for (j = 1; j <= boardSize; j++) {
      let square = document.createElement("div");
      square.className = "square";
      square.id = `${boardSize * i + j}`;
      square.addEventListener("click", () => squareClick(square));
      // square.setAttribute("onclick", 'squareClick(square)');
      square.addEventListener("mouseover", () => hoverSquareSelection(square));
      // square.setAttribute("onmouseover", 'hoverSquareSelection(square)');
      square.addEventListener("mouseleave", () =>
        resetChoosingSquareStyle(square)
      );
      // square.setAttribute("onmouseleave", 'resetChoosingSquareStyle(square)');
      row.appendChild(square);
    }
    document.getElementById("game-board").appendChild(row);
  }
}

function clearBoard() {
  document.getElementById("game-board").innerHTML = "";
}

function resetGame() {
  player1Set.clear();
  player2Set.clear();
  document.getElementById("player-order").innerText = "Player 1 turn: ";
  turnOrder = "Player1";
  document
    .querySelectorAll('div[class*="player"]')
    .forEach((el) => (el.className = "square"));
}

// element functions

function squareClick(item) {
  let selectedRegex = /.*selected/;
  if (!selectedRegex.test(item.className)) {
    if (turnOrder === "Player1") {
      // if square is not selected, apply clicking logic
      player1Set.add(parseInt(item.id));
      turnOrder = "Player2";
      item.className = "player1-selected";
      document.getElementById("player-order").innerText = "Player 2 turn: ";
    } else if (turnOrder === "Player2") {
      player2Set.add(parseInt(item.id));
      turnOrder = "Player1";
      item.className = "player2-selected";
      document.getElementById("player-order").innerText = "Player 1 turn: ";
    }
    if (
      winningSets.filter((winningSet) => isSuperset(player1Set, winningSet))
        .length > 0
    ) {
      document.getElementById("player-order").innerText = "Player 1 won!";
      turnOrder = "game-end";
      alert("Player 1 won!");
    }
    if (
      winningSets.filter((winningSet) => isSuperset(player2Set, winningSet))
        .length > 0
    ) {
      document.getElementById("player-order").innerText = "Player 2 won!";
      turnOrder = "game-end";
      alert("Player 2 won!");
    }
    console.log("Player1 set: ", player1Set);
    console.log("Player2 set: ", player2Set);
  }
}

function hoverSquareSelection(item) {
  if (turnOrder !== "game-end")
    if (item.className === "square") {
      if (turnOrder == "Player1") {
        item.classList.add("player1-choosing");
      } else {
        item.classList.add("player2-choosing");
      }
    }
}
function resetChoosingSquareStyle(item) {
  if (
    item.classList.contains("player1-choosing") ||
    item.classList.contains("player2-choosing")
  ) {
    item.className = "square";
  }
}
