import { input } from "./input.js";

const ranges = input
  .split("\n")
  .map((x) =>
    /(\d+)-(\d+)/
      .exec(x)
      .slice(1, 3)
      .map((y) => parseInt(y))
      .toSorted((a, b) => a[0] - b[0])
  )
  .toSorted((a, b) => a[0] - b[0]);

let i = 0;
const allowed = [];
for (const [start, end] of ranges) {
  if (i > 4294967295) break;

  if ((i >= start && i <= end) || ranges.some((x) => x[0] <= i && x[1] >= i)) {
    i += start - i + (end - start) + 1;
    continue;
  }

  allowed.push(i);
  i++;
}

console.log(allowed[0]);
console.log(allowed.length);
