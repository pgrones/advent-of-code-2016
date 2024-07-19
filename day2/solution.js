import { input } from "./input.js";

const numberPad = new Array(9).fill().map((_, i) => ({ number: i + 1 }));

for (const numberKey of numberPad) {
  numberKey.R = numberKey.number % 3 !== 0 ? numberPad[numberKey.number] : null;
  numberKey.L =
    numberKey.number % 3 !== 1 ? numberPad[numberKey.number - 2] : null;
  numberKey.D = numberKey.number < 7 ? numberPad[numberKey.number + 2] : null;
  numberKey.U = numberKey.number > 3 ? numberPad[numberKey.number - 4] : null;
}

const instructions = input.split("\n").map((x) => x.split(""));
let pos = numberPad[4];
let code = "";

for (const instruction of instructions) {
  for (const move of instruction) {
    pos = pos[move] ?? pos;
  }

  code += pos.number.toString();
}

console.log(code);

const keyPad = new Array(13).fill().map((_, i) => ({
  key: i < 9 ? (i + 1).toString() : String.fromCharCode(56 + i),
}));

for (const key of keyPad) {
  if (!["1", "4", "9", "C", "D"].includes(key.key))
    key.R = keyPad[keyPad.findIndex((x) => x.key === key.key) + 1];

  if (!["1", "2", "5", "A", "D"].includes(key.key))
    key.L = keyPad[keyPad.findIndex((x) => x.key === key.key) - 1];

  if (["6", "7", "8", "A", "B", "C"].includes(key.key))
    key.U = keyPad[keyPad.findIndex((x) => x.key === key.key) - 4];

  if (key.key === "3") key.U = keyPad[0];

  if (key.key === "D") key.U = keyPad[keyPad.length - 3];

  if (["2", "3", "4", "6", "7", "8"].includes(key.key))
    key.D = keyPad[keyPad.findIndex((x) => x.key === key.key) + 4];

  if (key.key === "1") key.D = keyPad[2];

  if (key.key === "B") key.D = keyPad[keyPad.length - 1];
}

pos = keyPad[4];
code = "";

for (const instruction of instructions) {
  for (const move of instruction) {
    pos = pos[move] ?? pos;
  }

  code += pos.key;
}

console.log(code);
