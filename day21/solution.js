import { input } from "./input.js";

class Scrambler {
  password = [];

  constructor(password) {
    this.password = [...password];
  }

  swapPosition(x, y) {
    const temp = this.password[x];
    this.password[x] = this.password[y];
    this.password[y] = temp;
  }

  swapLetter(x, y) {
    const xi = this.password.indexOf(x);
    const yi = this.password.indexOf(y);
    this.swapPosition(xi, yi);
  }

  rotateRight(x) {
    for (let i = 0; i < x; i++) {
      this.password = [this.password.pop(), ...this.password];
    }
  }

  rotateLeft(x) {
    for (let i = 0; i < x; i++) {
      this.password = [
        ...this.password.slice(1, this.password.length),
        this.password[0],
      ];
    }
  }

  rotateBased(x, reverse) {
    let xi = 1 + this.password.indexOf(x);

    if (!reverse) {
      if (xi > 4) xi++;

      this.rotateRight(xi);
      return;
    }

    const reverseMap = [1, 1, 6, 2, 7, 3, 0, 4];
    this.rotateLeft(reverseMap[this.password.indexOf(x)]);
  }

  reversePositions(x, y) {
    this.password = [
      ...this.password.slice(0, x),
      ...this.password.slice(x, y + 1).toReversed(),
      ...this.password.slice(y + 1),
    ];
  }

  movePosition(x, y, reverse) {
    if (reverse) {
      const temp = x;
      x = y;
      y = temp;
    }

    const [letter] = this.password.splice(x, 1);
    this.password.splice(y, 0, letter);
  }

  scramble(input, reverse) {
    const instructions = input.split("\n");

    if (reverse) instructions.reverse();

    for (const instruction of instructions) {
      const operation = instruction
        .split(" ")
        .slice(0, 2)
        .map((x, i) =>
          i
            ? reverse && (x === "left" || x === "right")
              ? x === "left"
                ? "Right"
                : "Left"
              : x[0].toUpperCase() + x.slice(1)
            : x
        )
        .join("");

      const args = [...instruction.matchAll(/(?<=\s)\w(?=\s|$)/g)].map((x) =>
        /\d/.test(x[0][0]) ? parseInt(x[0][0]) : x[0][0]
      );

      console.log(this.password.join(""), operation, args);

      this[operation](...args, reverse);
    }

    console.log(this.password.join(""));
  }
}

new Scrambler("abcdefgh").scramble(input);
new Scrambler("fbgdceah").scramble(input, true);
