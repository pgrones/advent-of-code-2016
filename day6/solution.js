import { input } from "./input.js";

const messages = input.split("\n");

const occurrences = [];

for (let i = 0; i < messages[0].length; i++) {
  occurrences.push(new Map());

  for (const message of messages) {
    const char = message.charAt(i);
    occurrences[i].set(char, (occurrences[i].get(char) ?? 0) + 1);
  }
}

const sortedOccurrences = occurrences
  .map((x) => {
    const occurrences = [...x.entries()].toSorted(
      ([, valueA], [, valueB]) => valueB - valueA
    );

    return [occurrences[0][0], occurrences[occurrences.length - 1][0]];
  })
  .reduce((prev, curr) => [prev[0] + curr[0], prev[1] + curr[1]]);

console.log(sortedOccurrences[0]);
console.log(sortedOccurrences[1]);
