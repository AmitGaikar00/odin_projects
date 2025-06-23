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

  placeShip(ship, startCoord, direction = "horizontal") {
    const [x, y] = startCoord;
    const shipCoordinates = [];

    for (let i = 0; i < ship.length; i++) {
      const coOrd = direction === "horizontal" ? [x + i, y] : [x, y + i];

      if (!this.isValidCoordinates(coOrd)) {
        console.log("Invalid ship placement: out of bounds.");
        throw new Error("Invalid ship placement: out of bounds.");
      }

      if (
        this.placedShips.some((ps) =>
          ps.coOrd.some((c) => c[0] === coOrd[0] && c[1] === coOrd[1])
        )
      ) {
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
}
