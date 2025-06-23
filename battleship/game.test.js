import { Ship, Gameboard } from "./game";

describe("ship class", () => {
  test("ship should initialize with length provided and isSunk should be false", () => {
    const ship = new Ship(5);
    expect(ship.length).toBe(5);
    expect(ship.isSunk()).toBe(false);
  });

  test("increase hit when hit function is called", () => {
    const ship = new Ship(2);

    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("sunk the ship when hits are matched", () => {
    const ship = new Ship(2);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});

describe("battleship game board", () => {
  test("places ship and hits it", () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [0, 0], "horizontal");

    expect(board.receiveAttack([0, 0])).toBe("hit");
    expect(board.receiveAttack([1, 0])).toBe("hit");
    expect(ship.isSunk()).toBe(true);
  });

  test("records missed attacks", () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [0, 0], "horizontal");

    expect(board.receiveAttack([5, 5])).toBe("miss");
    expect(board.getMissedAttacks()).toContainEqual([5, 5]);
  });

  test("allShipsSunk returns false then true", () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    board.placeShip(ship, [0, 0]);

    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack([0, 0]);
    expect(board.allShipsSunk()).toBe(true);
  });
});
