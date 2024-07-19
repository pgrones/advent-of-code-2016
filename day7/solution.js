import { input } from "./input.js";

const ips = input
  .split("\n")
  .map((x) =>
    [...x.matchAll(/\[*\w+\]*/g)].reduce((prev, curr) => [...prev, curr[0]], [])
  )
  .reduce(
    (prev, curr) => [
      ...prev,
      {
        sequences: curr.filter((x) => !x.includes("[")),
        hyperNetSequences: curr
          .filter((x) => x.includes("["))
          .map((x) => x.replaceAll(/[\[\]]/g, "")),
      },
    ],
    []
  );

const hasAbba = (sequence) => {
  if (sequence[0] === sequence[1]) return false;

  let hasAbba = true;

  for (let i = 0; i < sequence.length / 2; i++) {
    if (sequence[i] !== sequence[sequence.length - 1 - i]) {
      hasAbba = false;
      break;
    }
  }

  return hasAbba;
};

let count = 0;

outer: for (const { sequences, hyperNetSequences } of ips) {
  for (const hyperNetSequence of hyperNetSequences) {
    for (let i = 0; i < hyperNetSequence.length - 3; i++) {
      if (hasAbba(hyperNetSequence.substring(i, i + 4))) continue outer;
    }
  }

  for (const sequence of sequences) {
    for (let i = 0; i < sequence.length - 3; i++) {
      if (hasAbba(sequence.substring(i, i + 4))) {
        count++;
        continue outer;
      }
    }
  }
}

console.log(count);

const hasAba = (sequence) => {
  if (sequence[0] === sequence[1] || sequence[0] !== sequence[2]) return false;

  return true;
};

const hasBab = (hyperNetSequences, aba) => {
  const bab = aba[1] + aba[0] + aba[1];

  return hyperNetSequences.some((x) => x.includes(bab));
};

count = 0;

outer: for (const { sequences, hyperNetSequences } of ips) {
  for (const sequence of sequences) {
    for (let i = 0; i < sequence.length - 2; i++) {
      const aba = sequence.substring(i, i + 3);

      if (hasAba(aba)) {
        if (hasBab(hyperNetSequences, aba)) {
          count++;
          continue outer;
        }
      }
    }
  }
}

console.log(count);
