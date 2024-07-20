import { input } from "./input.js";

const isSafe = (prevRow, x) => {
  const trapPatterns = ["^^.", ".^^", "^..", "..^"];

  let pattern = prevRow.substring(
    Math.max(0, x - 1),
    Math.min(x + 2, prevRow.length)
  );

  if (pattern.length < 3) {
    if (x === 0) pattern = "." + pattern;
    else pattern += ".";
  }

  return !trapPatterns.includes(pattern);
};

const countSafeTiles = (rows) => {
  const map = [input];

  for (let i = 0; i < rows - 1; i++) {
    let nextRow = "";

    for (let x = 0; x < map[i].length; x++) {
      nextRow += isSafe(map[i], x) ? "." : "^";
    }

    map.push(nextRow);
  }

  return map.reduce(
    (prev, curr) => prev + [...curr].filter((x) => x === ".").length,
    0
  );
};

console.log(countSafeTiles(40));
console.log(countSafeTiles(400_000));
