import { input } from "./input.js";

const instructions = input
  .split("\n")
  .map((x) =>
    [...x.matchAll(/(rect|column|row).*?(\d+).*?(\d+)/g)][0]
      .slice(1, 4)
      .map((y, i) => (i == 0 ? y : parseInt(y)))
  );

const createScreen = (height, width) =>
  new Array(height).fill().map(() => new Array(width).fill("."));

const printScreen = (screen) => {
  for (const row of screen) {
    console.log(row.join(""));
  }
  console.log("\n");
};

const screen = createScreen(6, 50);

for (const [operation, position, by] of instructions) {
  if (operation === "rect") {
    for (let y = 0; y < by; y++) {
      for (let x = 0; x < position; x++) {
        screen[y][x] = "#";
      }
    }
  }

  if (operation === "column") {
    for (let step = 0; step < by; step++) {
      let lastPixel = screen[0][position];

      for (let i = 1; i <= screen.length; i++) {
        if (i === screen.length) {
          screen[0][position] = lastPixel;
          break;
        }

        const temp = screen[i][position];
        screen[i][position] = lastPixel;
        lastPixel = temp;
      }
    }
  }

  if (operation === "row") {
    for (let step = 0; step < by; step++) {
      let lastPixel = screen[position][0];

      for (let i = 1; i <= screen[position].length; i++) {
        if (i === screen[position].length) {
          screen[position][0] = lastPixel;
          break;
        }

        const temp = screen[position][i];
        screen[position][i] = lastPixel;
        lastPixel = temp;
      }
    }
  }
}

console.log(
  screen.reduce(
    (prev, curr) =>
      prev + curr.reduce((prev, curr) => prev + (curr === "#"), 0),
    0
  )
);

printScreen(screen);
