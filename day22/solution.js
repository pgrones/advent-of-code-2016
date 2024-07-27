import { input } from "./input.js";

const nodes = input
  .split("\n")
  .slice(2)
  .map((x) =>
    [...x.matchAll(/\d+(?=T)/g)]
      .map((x) => parseInt(x[0]))
      .reduce(
        (prev, curr, i) => ({
          ...prev,
          [i === 0 ? "size" : i === 1 ? "used" : "avail"]: curr,
        }),
        { name: x.split(" ")[0], goal: false }
      )
  );

const isViable = (a, b) => a.used !== 0 && b.avail >= a.used;

let pairs = 0;

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    if (isViable(nodes[i], nodes[j])) pairs++;
    if (isViable(nodes[j], nodes[i])) pairs++;
  }
}

console.log(pairs);

const graph = [];

for (const node of nodes) {
  const [x, y] = [...node.name.matchAll(/\d+/g)].map((x) => parseInt(x[0]));

  if (!graph[x]) graph[x] = [];

  graph[x][y] = { ...node, x, y };
}

graph[graph.length - 1][0].goal = true;

const dataFits = (a, b) => a.avail >= b.used;

const getNeighbors = (node, prevNode, graph) => {
  return [
    graph[node.x - 1]?.[node.y],
    graph[node.x + 1]?.[node.y],
    graph[node.x][node.y - 1],
    graph[node.x][node.y + 1],
  ].filter((x) => x && x.name !== prevNode?.name && dataFits(x, node));
};

const copyGraph = (graph) => graph.map((x) => x.map((y) => structuredClone(y)));

const moveData = (node, target) => {
  target.used += node.used;
  node.used = 0;
  target.avail = target.size - target.used;
  node.avail = node.size;

  if (node.goal) {
    target.goal = true;
    node.goal = false;
  }
};

let minPathLength = Infinity;
const traverse = (node, graph, prevNode = null, pathLength = 0, path = []) => {
  if (pathLength >= minPathLength || pathLength > 7) return;

  if (node.x === 0 && node.y === 0 && node.goal) {
    minPathLength = pathLength;
    console.log(pathLength, path);
    return;
  }

  const neighbors = getNeighbors(node, prevNode, graph);

  if (!neighbors.length) return;

  for (const neighbor of neighbors) {
    for (const col of graph) {
      for (const n of col) {
        const graphCopy = copyGraph(graph);
        moveData(graphCopy[node.x][node.y], graphCopy[neighbor.x][neighbor.y]);
        traverse(n, graphCopy, node, pathLength + 1, [
          ...path,
          {
            from: graphCopy[node.x][node.y].name,
            to: graphCopy[neighbor.x][neighbor.y].name,
          },
        ]);
      }
    }
  }
};

for (const col of graph) {
  for (const n of col) {
    const graphCopy = copyGraph(graph);
    traverse(n, graphCopy);
  }
}

console.log(minPathLength);
