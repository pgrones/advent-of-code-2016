import { input } from "./input.js";

class Solver {
  #dir = "NORTH";
  #dirs = new Map([
    ["NORTH", (steps) => (this.#y += steps)],
    ["EAST", (steps) => (this.#x += steps)],
    ["SOUTH", (steps) => (this.#y -= steps)],
    ["WEST", (steps) => (this.#x -= steps)],
  ]);
  #x = 0;
  #y = 0;
  #visited = new Set();
  #location;
  #instructions;

  constructor(input) {
    this.#instructions = input.split(", ");
  }

  #nextDir(turn) {
    const dirs = [...this.#dirs.keys()];
    const currIndex = dirs.indexOf(this.#dir);

    if (turn === "R" && currIndex === dirs.length - 1) {
      this.#dir = dirs[0];
      return;
    }

    if (turn === "L" && currIndex === 0) {
      this.#dir = dirs[dirs.length - 1];
      return;
    }

    this.#dir = dirs[currIndex + (turn === "R" ? 1 : -1)];
  }

  #walk(steps) {
    const prevX = this.#x;
    const prevY = this.#y;

    this.#dirs.get(this.#dir)(steps);

    if (this.#location) return;

    this.#logVisit(prevX, prevY);
  }

  #logVisit(prevX, prevY) {
    const logVisit = (x, y) => {
      const location = x.toString() + "," + y.toString();

      if (!this.#location && this.#visited.has(location)) {
        this.#location = location;
        return;
      }

      this.#visited.add(location);
    };

    if (this.#x !== prevX)
      do {
        prevX += prevX < this.#x ? 1 : -1;
        logVisit(prevX, this.#y);
      } while (this.#x !== prevX);

    if (this.#y !== prevY)
      do {
        prevY += prevY < this.#y ? 1 : -1;
        logVisit(this.#x, prevY);
      } while (this.#y !== prevY);
  }

  solve() {
    for (const instruction of this.#instructions) {
      const turn = instruction.charAt(0);
      const steps = parseInt(instruction.substring(1));

      this.#nextDir(turn);
      this.#walk(steps);
    }

    console.log(Math.abs(this.#x) + Math.abs(this.#y));

    const [x, y] = this.#location.split(",").map((x) => Math.abs(parseInt(x)));
    console.log(x + y);
  }
}

new Solver(input).solve();
