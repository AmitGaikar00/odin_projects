let isOver = false;
let isTie = false;

function Gameboard() {
  let row = 3;
  let column = 3;
  let board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropValue = (val, playerChoice) => {
    // let row = Math.floor((val - 1) / 3);
    // let column = (val - 1) % 3;
    let row = val[0];
    let column = val[1];

    if (board[row][column].getValue() === "-") {
      board[row][column].addValue(playerChoice);
    }
  };

  const printBoard = () => {
    let mappedBoard = board.map((row) => row.map((col) => col.getValue()));
    for (let arr of mappedBoard) {
      console.log(arr);
    }
  };

  return { getBoard, dropValue, printBoard };
}

function Cell() {
  let value = "-";

  let addValue = (val) => {
    value = val;
  };

  let getValue = () => value;

  return { addValue, getValue };
}

function GameController() {
  const board = Gameboard();
  let playerOneName = "Player One";
  let playerTwoName = "Player Two";

  let players = [
    {
      name: playerOneName,
      token: "O",
    },
    {
      name: playerTwoName,
      token: "X",
    },
  ];

  let activePlayer = players[0];

  let switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  let getActivePlayer = () => activePlayer;

  const printNewBoard = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name} Turn :-`);
  };

  let playRound = (choice) => {
    console.log(`Dropping ${getActivePlayer().name}'s choice in ${choice}`);

    board.dropValue(choice, getActivePlayer().token);

    // win logic
    let winner = checkWinner(board.getBoard());
    if (winner !== -1) {
      let result = winner === "O" ? players[0] : players[1];
      board.printBoard();
      console.log(`${result.name} wins the game`);
      isOver = true;
      return;
    }

    // Check for tie
    const flatBoard = board.getBoard().flat();
    const isTie = flatBoard.every((cell) => cell.getValue() !== "-");
    if (isTie) {
      board.printBoard();
      console.log("It's a tie!");
      isOver = true;
      isTie = true;
      return;
    }

    switchPlayerTurn();
    printNewBoard();
  };

  printNewBoard();

  return { getActivePlayer, playRound, getBoard: board.getBoard };
}

function checkWinner(board) {
  const lines = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (const [[x1, y1], [x2, y2], [x3, y3]] of lines) {
    const v1 = board[x1][y1].getValue();
    const v2 = board[x2][y2].getValue();
    const v3 = board[x3][y3].getValue();

    if (v1 !== "-" && v1 === v2 && v2 === v3) {
      return v1;
    }
  }

  return -1;
}

// const readline = require("readline");
// // import readline from 'readline'

// // Create the interface to read from command line
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function playGame() {
//   let newGame = GameController();

//   const ask = () => {
//     if (isOver) {
//       console.log("Game over!");
//       rl.close();
//       return;
//     }

//     rl.question("Enter your choice (number from 1 to 10): ", (input) => {
//       const number = parseInt(input);
//       if (!isNaN(number) && number >= 1 && number <= 10) {
//         newGame.playRound(number);
//       } else {
//         console.log("Invalid input, please enter a number between 1 and 10.");
//       }

//       ask(); // ask again
//     });
//   };

//   ask();
// }

// playGame();

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".player_turn");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get board and active player
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    if (isOver) {
      playerTurnDiv.textContent = isTie
        ? "Its a tie MF !!!!!!"
        : activePlayer.name + " wins!!!!!!!";
    } else {
      playerTurnDiv.textContent =
        activePlayer.name + "'s turn : " + activePlayer.token;
    }

    // print the board
    board.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;

        cellButton.textContent = cell.getValue();

        boardDiv.appendChild(cellButton);

        if (cell.getValue() !== "-") {
          cellButton.disabled = true;
        }

        // cellButton.disabled = true;
      })
    );
  };

  const handleEvents = (e) => {
    // not correct cell return
    if (isOver) return;
    if (isNaN(e.target.dataset.row) || isNaN(e.target.dataset.column)) return;

    const choice = [
      Number(e.target.dataset.row),
      Number(e.target.dataset.column),
    ];
    // console.log(choice);

    game.playRound(choice);
    updateScreen();
  };

  boardDiv.onclick = handleEvents;

  // initial render
  updateScreen();
}

ScreenController();

// reset functionality
const resetButton = document.querySelector(".reset");
resetButton.onclick = () => {
  ScreenController();
  console.clear();
  isOver = false;
  isTie = false;
};
