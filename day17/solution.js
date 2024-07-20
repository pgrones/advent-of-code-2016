import crypto from "crypto";

const input = "pvhmgsws";

const createHash = (data) =>
  crypto.createHash("md5").update(data).digest("hex");

const getOpenDoors = (path, x, y) =>
  [
    ["U", [x, y - 1]],
    ["D", [x, y + 1]],
    ["L", [x - 1, y]],
    ["R", [x + 1, y]],
  ].filter(
    ([, [x, y]], i) =>
      createHash(path).charCodeAt(i) >= 98 && x >= 0 && x < 4 && y >= 0 && y < 4
  );

let shortestPath = "";

const traverse = (path, x = 0, y = 0) => {
  if (shortestPath !== "" && path.length >= shortestPath.length) return;

  if (x === 3 && y === 3) {
    shortestPath = path.substring(input.length);
    return;
  }

  for (const [dir, coords] of getOpenDoors(path, x, y)) {
    traverse(path + dir, ...coords);
  }
};

traverse(input);
console.log(shortestPath);

let longestPath = -Infinity;

const traverseLongest = (path, x = 0, y = 0) => {
  if (x === 3 && y === 3) {
    longestPath = Math.max(longestPath, path.substring(input.length).length);
    return;
  }

  for (const [dir, coords] of getOpenDoors(path, x, y)) {
    traverseLongest(path + dir, ...coords);
  }
};

traverseLongest(input);
console.log(longestPath);
