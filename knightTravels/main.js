const isValid = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

const knightDirections = [
  [1, 2],
  [2, 1],
  [1, -2],
  [2, -1],
  [-1, 2],
  [-2, 1],
  [-1, -2],
  [-2, -1],
];

function knightMoves([x, y], [x1, y1]) {
  let queue = [[[x, y], [[x, y]]]];

  let set = new Set();

  while (queue.length > 0) {
    const [[x, y], path] = queue.shift();

    const key = `${x},${y}`;

    // check if destination is reached return entire path
    if (x === x1 && y === y1) {
      return path;
    }

    // check if path is already visited in set then continue this iteration go for next iteration
    if (set.has(key)) continue;

    // if path is not visited add that path in set;
    set.add(key);

    // take all the possible knight moves in for loop from knightdirections array and push in the queue
    for ([dx, dy] of knightDirections) {
      const nx = dx + x;
      const ny = dy + y;

      if (isValid(nx, ny)) {
        queue.push([
          [nx, ny],
          [...path, [nx, ny]],
        ]);
      }
    }
  }

  return "No path found";
}

let shp = knightMoves([0, 0], [3, 3]);

console.log(shp);

// printRes(knightMoves([3,3],[0,0]))
printRes(knightMoves([0, 0], [7, 7]));

function printRes(arr) {
  let res = "";
  for (li of arr) {
    res += li.join(",");
    res += "->";
  }
  console.log(res);
}
