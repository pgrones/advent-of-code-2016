import { input } from "./input.js";

const triangles = input.split("\n").map((x) =>
  x
    .trim()
    .split(/\s+/)
    .map((y) => parseInt(y))
);

const countPossibleTriangles = (triangles) => {
  let count = 0;

  outer: for (const triangle of triangles) {
    for (let i = 0; i < triangle.length; i++) {
      const side = triangle[i];
      const sum = triangle.toSpliced(i, 1).reduce((prev, curr) => prev + curr);

      if (sum <= side) continue outer;
    }

    count++;
  }

  return count;
};

console.log(countPossibleTriangles(triangles));

const verticalTriangles = [];

for (let i = 0; i < triangles.length; i += 3) {
  const newTriangles = [[], [], []];

  for (let j = i; j < i + 3; j++) {
    for (let k = 0; k < 3; k++) {
      newTriangles[k].push(triangles[j][k]);
    }
  }

  verticalTriangles.push(...newTriangles);
}

console.log(countPossibleTriangles(verticalTriangles));
