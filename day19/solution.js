const input = 3018458;

let elves = new Map(new Array(input).fill().map((_, i) => [i + 1, 1]));

const stealFromElf = (elf, elfToStealFrom) => {
  elves.set(elf.value, elves.get(elf.value) + elves.get(elfToStealFrom.value));
  elves.delete(elfToStealFrom.value);
};

const play = () => {
  while (true) {
    const keys = elves.keys();
    const firstElf = keys.next();
    let currElf = firstElf;
    let elfToStealFrom;
    let firstLoop = true;

    while (true) {
      if (!firstLoop) currElf = keys.next();
      firstLoop = false;

      elfToStealFrom = keys.next();

      if (currElf.done) break;

      if (elfToStealFrom.done) {
        stealFromElf(currElf, firstElf);

        if (elves.size === 1) return currElf.value;

        break;
      }

      stealFromElf(currElf, elfToStealFrom);

      if (elves.size === 1) return currElf.value;
    }
  }
};

console.log(play());
