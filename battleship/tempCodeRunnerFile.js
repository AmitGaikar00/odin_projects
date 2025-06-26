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
    const [x, y] = startCoord;
    const shipCoordinates = [];

    for (let i = 0; i < ship.length; i++) {
      const coOrd = direction === "horizontal" ? [x + i, y] : [x, y + i];

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

      shipCoordinates.push(coOrd);
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
        res[c[0]][c[1]] = 1;
        // res[r][c] = "🚢";
      });

      ps.hits.forEach((h) => {
        res[h[0]][h[1]] = "x";
        // res[r][c] = "💥"; // hit
      });
    });

    this.missedAttacks.forEach((ms) => {
      res[ms[0]][ms[1]] = "x";
      // res[r][c] = "❌"; // miss
    });

    // console.log(res);
    for (let val of res) {
      console.log(val.join(" "));
    }
  }

  canPlaceShip(length, [row, col], direction) {
    for (let i = 0; i < length; i++) {
      const r = direction === "vertical" ? row + i : row;
      const c = direction === "horizontal" ? col + i : col;

      // Bounds check
      if (!this.isValidCoordinates([r, c])) {
        return false;
      }

      // Collision check
      if (this.isOccupied([r, c])) {
        return false;
      }
    }

    return true;
  }

  placeShipsRandomly() {
    const shipLengths = [5, 4, 3, 3, 2, 1];
    const directions = ["horizontal", "vertical"];
    const maxRetries = 100;

    for (let length of shipLengths) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < maxRetries) {
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
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

    this.players = [this.real__player, this.computer__player];
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
    this.activePlayer.printBoard();
  }
}

let gm = new GameController();

gm.getActivePlayer();
