import { GameController } from "./gameClasses.js";

const playerGrid = document.querySelector(".player__grid");
const computerGrid = document.querySelector(".computer__grid");
const resultDisplay = document.querySelector(".result");
const turnDisplay = document.querySelector(".turn");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");

let controller;
let gameStarted = false;

// Generate 10x10 grid
function createGrid(gridEl, type) {
  gridEl.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cube");
    cell.dataset.index = i;

    if (type === "computer") {
      cell.addEventListener("click", () => handlePlayerAttack(i));
    }

    gridEl.appendChild(cell);
  }
}

// Convert index to coordinates
function indexToCoord(index) {
  return [Math.floor(index / 10), index % 10];
}

function updateGrid(board, gridEl, showShips = false) {
  const cells = gridEl.querySelectorAll(".cube");

  cells.forEach((cell, i) => {
    const [x, y] = indexToCoord(i);
    cell.className = "cube";

    if (
      board.placedShips.some((ps) =>
        ps.hits.some((h) => h[0] === x && h[1] === y)
      )
    ) {
      cell.classList.add("hit");
    } else if (board.missedAttacks.some((m) => m[0] === x && m[1] === y)) {
      cell.classList.add("miss");
    } else if (
      showShips &&
      board.placedShips.some((ps) =>
        ps.coOrd.some((c) => c[0] === x && c[1] === y)
      )
    ) {
      cell.classList.add("ship");
    }
  });
}

function handlePlayerAttack(index) {
  if (!gameStarted) return;

  const coord = indexToCoord(index);
  const computerBoard = controller.computer__player;

  const cell = computerGrid.querySelector(`[data-index="${index}"]`);
  if (cell.classList.contains("hit") || cell.classList.contains("miss")) {
    return; // Already attacked
  }

  const result = computerBoard.receiveAttack(coord);
  updateGrid(computerBoard, computerGrid);

  resultDisplay.textContent = `Result: Player ${result.toUpperCase()}`;

  if (computerBoard.allShipsSunk()) {
    resultDisplay.textContent = "🎉 Player Wins!";
    gameStarted = false;
    return;
  }

  turnDisplay.textContent = "Turn: Computer";
  setTimeout(() => {
    handleComputerTurn();
  }, 500);
}

function handleComputerTurn() {
  const playerBoard = controller.real__player;
  let coord;
  let result;

  do {
    coord = playerBoard.randomAttack();
  } while (
    playerBoard.missedAttacks.some(
      ([x, y]) => x === coord[0] && y === coord[1]
    ) ||
    playerBoard.placedShips.some((ps) =>
      ps.hits.some(([x, y]) => x === coord[0] && y === coord[1])
    )
  );

  result = playerBoard.receiveAttack(coord);
  updateGrid(playerBoard, playerGrid, true);

  resultDisplay.textContent = `Result: Computer ${result.toUpperCase()}`;

  if (playerBoard.allShipsSunk()) {
    resultDisplay.textContent = "💥 Computer Wins!";
    gameStarted = false;
    return;
  }

  turnDisplay.textContent = "Turn: Player";
}

// Reset the game
function resetGame() {
  controller = new GameController();
  createGrid(playerGrid, "player");
  createGrid(computerGrid, "computer");
  updateGrid(controller.real__player, playerGrid, true);
  updateGrid(controller.computer__player, computerGrid);
  resultDisplay.textContent = "Result: ";
  turnDisplay.textContent = "Turn: ";
  gameStarted = false;
}

startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    turnDisplay.textContent = "Turn: Player";
  }
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

resetGame(); 
