const input = 1350;

const isOpenSpace = (x, y) => {
  const sum = x * x + 3 * x + 2 * x * y + y + y * y + input;
  return sum.toString(2).replaceAll("0", "").length % 2 === 0;
};

const getOpenSpaces = (x, y) => {
  return [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ].filter((x) => x.every((y) => y >= 0) && isOpenSpace(...x));
};

let shortestPath = Infinity;

const traverse = (x, y, goalX, goalY, visited = new Set()) => {
  if (shortestPath <= visited.size) return;

  if (x === goalX && y === goalY) {
    shortestPath = visited.size;
    return;
  }

  const coords = x.toString() + "," + y.toString();

  if (visited.has(coords)) return;

  visited.add(coords);

  for (const [nextX, nextY] of getOpenSpaces(x, y)) {
    traverse(nextX, nextY, goalX, goalY, new Set([...visited]));
  }
};

traverse(1, 1, 31, 39);
console.log(shortestPath);

const spaces = new Set();

const traverseSteps = (steps, x, y, visited = new Set()) => {
  const coords = x.toString() + "," + y.toString();
  const wasVisited = visited.has(coords);

  visited.add(coords);

  if (!steps || wasVisited) {
    visited.forEach((v) => spaces.add(v));
    return;
  }

  for (const [nextX, nextY] of getOpenSpaces(x, y)) {
    traverseSteps(steps - 1, nextX, nextY, new Set([...visited]));
  }
};

traverseSteps(50, 1, 1);
console.log(spaces.size);
