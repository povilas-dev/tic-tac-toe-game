const winningSets = [
  new Set([1, 2, 3]),
  new Set([1, 5, 9]),
  new Set([2, 5, 8]),
  new Set([3, 5, 7]),
  new Set([1, 4, 7]),
  new Set([4, 5, 6]),
  new Set([7, 8, 9]),
  new Set([3, 6, 9]),
];
let player1Set = new Set();
let player2Set = new Set();
let turnOrder = "Player1";

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
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
