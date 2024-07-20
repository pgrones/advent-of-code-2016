import { input } from "./input.js";

const instructions = input.split("\n");

class Bot {
  chips = [];
  low;
  high;

  receive(chip) {
    this.chips.push(chip);
    this.chips.sort((a, b) => a - b);
  }

  give() {
    this.high.receive(this.chips.pop());
    this.low.receive(this.chips.pop());
  }
}

class Output {
  chips = [];

  receive(chip) {
    this.chips.push(chip);
  }
}

const bots = new Map();
const outputs = new Map();

for (const instruction of instructions) {
  const matches = [...instruction.matchAll(/\w+\s+\d+/g)].map((x) => x[0]);

  if (matches.length === 2) {
    const chip = parseInt(/\d+/.exec(matches[0])[0]);

    const bot = bots.get(matches[1]) ?? new Bot();
    bot.receive(chip);

    bots.set(matches[1], bot);

    continue;
  }

  const [name, low, high] = matches;

  const bot = bots.get(name) ?? new Bot();
  bots.set(name, bot);

  const getDest = (dest) => {
    if (dest.startsWith("bot")) {
      const bot = bots.get(dest) ?? new Bot();
      bots.set(dest, bot);
      return bot;
    }

    const output = outputs.get(dest) ?? new Output();
    outputs.set(dest, output);
    return output;
  };

  bot.low = getDest(low);
  bot.high = getDest(high);
}

const process = (chips) => {
  for (
    let botEntry = [...bots.entries()].find(([, x]) => x.chips.length === 2);
    botEntry;
    botEntry = [...bots.entries()].find(([, x]) => x.chips.length === 2)
  ) {
    const [name, bot] = botEntry;

    if (bot.chips.every((x) => chips.includes(x))) {
      console.log(parseInt(/\d+/.exec(name)[0]));
    }

    bot.give();
  }
};

process([61, 17]);

console.log(
  [
    outputs.get("output 0"),
    outputs.get("output 1"),
    outputs.get("output 2"),
  ].reduce((prev, curr) => prev * curr.chips[0], 1)
);
