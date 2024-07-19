import { input } from "./input.js";

let file = input;

for (let i = 0; i < file.length; i++) {
  const remaining = file.substring(i);

  const match = remaining.match(/^\((\d+)x(\d+)\)/);

  if (match) {
    const length = match[0].length;
    const next = parseInt(match[1]);
    const repeat = parseInt(match[2]);

    file =
      file.substring(0, i) +
      remaining.substring(length, length + next).repeat(repeat) +
      remaining.substring(length + next);

    i += next * repeat - 1;
  }
}

console.log(file.length);
