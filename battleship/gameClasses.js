export class Ship {
  length;
  hits;

  constructor(length) {
    this.length = length;
    this.hits = 0;
  }
  hit() {
    if (this.hits < this.length) this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

export class Gameboard {
  boardSize = 10;
  ships = []; // array of ships
  placedShips = []; // array of objects = { ship : ship , coOrd :[[x,y] , [x, y]] , hits:[]}
  missedAttacks = [];

  isValidCoordinates([x, y]) {
    return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
  }

  isOccupied([x, y]) {
    return this.placedShips.some((ps) =>
      ps.coOrd.some((c) => c[0] === x && c[1] === y)
    );
  }

  placeShip(ship, startCoord, direction = "horizontal") {
    const shipCoordinates = this.getShipCoordinates(
      ship.length,
      startCoord,
      direction
    );

    for (const coOrd of shipCoordinates) {
      if (!this.isValidCoordinates(coOrd)) {
        console.log("Invalid ship placement: out of bounds.");
        throw new Error("Invalid ship placement: out of bounds.");
      }

      if (this.isOccupied(coOrd)) {
        console.log("Invalid ships placement : overlapping with other ships");
        throw new Error(
          "Invalid ships placement : overlapping with other ships"
        );
      }
    }

    this.placedShips.push({ ship, coOrd: shipCoordinates, hits: [] });
    this.ships.push(ship);
  }

  receiveAttack(coOrd) {
    const [x, y] = coOrd;

    if (!this.isValidCoordinates(coOrd)) {
      console.log("Invalid attack: out of bounds.");
      throw new Error("Invalid attack: out of bounds.");
    }

    for (let placed of this.placedShips) {
      const index = placed.coOrd.findIndex((c) => c[0] === x && c[1] === y);

      if (index !== -1) {
        placed.ship.hit();
        placed.hits.push(coOrd);
        return "hit";
      }
    }

    this.missedAttacks.push(coOrd);
    return "miss";
  }

  getMissedAttacks() {
    return [...this.missedAttacks];
  }

  allShipsSunk() {
    return this.ships.every((sh) => sh.isSunk());
  }

  randomAttack() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }

  printBoard() {
    // let res = new Array(10).fill(new Array(10).fill(0));
    let res = Array.from({ length: 10 }, () => Array(10).fill(0));

    this.placedShips.forEach((ps) => {
      ps.coOrd.forEach((c) => {
        // res[c[0]][c[1]] = "🚢"; // ship
        res[c[0]][c[1]] = "1"; // ship
      });

      ps.hits.forEach((h) => {
        // res[h[0]][h[1]] = "💥"; // hit
        res[h[0]][h[1]] = "x"; // hit
      });
    });

    this.missedAttacks.forEach((ms) => {
      // res[ms[0]][ms[1]] = "❌"; // miss
      res[ms[0]][ms[1]] = "m"; // miss
    });

    // console.log(res);
    for (let val of res) {
      console.log(val.join(" "));
    }
  }

  canPlaceShip(length, startCoord, direction) {
    const shipCoords = this.getShipCoordinates(length, startCoord, direction);
    return shipCoords.every(
      (coord) => this.isValidCoordinates(coord) && !this.isOccupied(coord)
    );
  }

  getShipCoordinates(length, [x, y], direction) {
    const coords = [];
    for (let i = 0; i < length; i++) {
      coords.push(direction === "horizontal" ? [x + i, y] : [x, y + i]);
    }
    return coords;
  }

  placeShipsRandomly() {
    const shipLengths = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5];
    const directions = ["horizontal", "vertical"];
    const maxRetries = 100;

    for (let length of shipLengths) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < maxRetries) {
        const direction =
          directions[Math.floor(Math.random() * directions.length)];

        let row = 0,
          col = 0;
        if (direction === "horizontal") {
          row = Math.floor(Math.random() * (this.boardSize - length + 1));
          col = Math.floor(Math.random() * this.boardSize);
        } else {
          row = Math.floor(Math.random() * this.boardSize);
          col = Math.floor(Math.random() * (this.boardSize - length + 1));
        }

        const startCoord = [row, col];

        if (this.canPlaceShip(length, startCoord, direction)) {
          const ship = new Ship(length);
          this.placeShip(ship, startCoord, direction);
          placed = true;
        }

        attempts++;
      }

      if (!placed) {
        console.warn(
          `Failed to place ship of length ${length} after ${maxRetries} attempts`
        );
      }
    }
  }
}

export class GameController {
  constructor() {
    this.real__player = new Gameboard();
    this.computer__player = new Gameboard();

    this.players = [
      { player_Name: "real__player", player_board: this.real__player },
      { player_Name: "computer__player", player_board: this.computer__player },
    ];
    this.activePlayer = this.players[0];

    this.real__player.placeShipsRandomly();
    this.computer__player.placeShipsRandomly();
  }

  switchPlayerTurn = () => {
    this.activePlayer =
      this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  };

  getActivePlayer = () => this.activePlayer;

  printPlayerBoard() {
    console.log("--------------------------------------------------");
    this.activePlayer.player_board.printBoard();
  }
}

// function playGame() {
//   const gm = new GameController();

//   let round = 1;

//   while (true) {
//     console.log(`\n=== Round ${round} ===`);
//     const activePlayer = gm.getActivePlayer();
//     const opponent =
//       activePlayer === gm.players[0] ? gm.players[1] : gm.players[0];

//     console.log(`\n${activePlayer.player_Name}'s turn:`);

//     let attackCoord;

//     if (activePlayer.player_Name === "real__player") {
//       // For now, generate random attacks (can be changed to prompt user)
//       attackCoord = activePlayer.player_board.randomAttack();
//     } else {
//       // Computer's random attack
//       attackCoord = activePlayer.player_board.randomAttack();
//     }

//     const result = opponent.player_board.receiveAttack(attackCoord);
//     console.log(
//       `${activePlayer.player_Name} attacks (${attackCoord[0]}, ${attackCoord[1]}) - ${result}`
//     );

//     gm.printPlayerBoard();

//     if (opponent.player_board.allShipsSunk()) {
//       console.log(`\n🏁 ${activePlayer.player_Name} wins the game!`);
//       break;
//     }

//     gm.switchPlayerTurn();
//     round++;
//   }
// }

// playGame();
