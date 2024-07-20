import { input } from "./input.js";

class Disc {
  constructor(positions, currentPosition) {
    this.positions = positions;
    this.currentPosition = currentPosition;
    this.originalPosition = currentPosition;
  }

  reset() {
    this.currentPosition = this.originalPosition;
  }

  rotate() {
    this.currentPosition =
      this.positions === this.currentPosition + 1
        ? 0
        : this.currentPosition + 1;
  }

  counterRotate() {
    this.currentPosition =
      this.currentPosition === 0
        ? this.positions - 1
        : this.currentPosition - 1;
  }
}

const discs = input
  .split("\n")
  .map(
    (x) =>
      new Disc(
        ...[...x.matchAll(/(?<!#|=)\d+/g)].flat().map((y) => parseInt(y))
      )
  );

const simulate = (discs) => {
  outer: for (let i = 0; ; i++) {
    let rotations = 0;

    for (const disc of discs) {
      discs.forEach((disc) => disc.rotate());
      rotations++;

      if (disc.currentPosition !== 0) {
        for (let x = 1; x < rotations; x++) {
          discs.forEach((disc) => disc.counterRotate());
        }

        continue outer;
      }
    }

    console.log(i);
    break;
  }
};

simulate(discs);

discs.forEach((disc) => disc.reset());
discs.push(new Disc(11, 0));

simulate(discs);
