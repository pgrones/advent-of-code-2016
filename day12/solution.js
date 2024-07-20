import { input } from "./input.js";

class Computer {
  a = 0;
  b = 0;
  c = 0;
  d = 0;
  pointer = 0;

  reset() {
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.d = 0;
    this.pointer = 0;
  }

  next() {
    this.pointer++;
  }

  inc(register) {
    this[register]++;
    this.next();
  }

  dec(register) {
    this[register]--;
    this.next();
  }

  cpy(registerOrValue, register) {
    this[register] = this[registerOrValue] ?? parseInt(registerOrValue);
    this.next();
  }

  jnz(registerOrValue, offset) {
    if ((this[registerOrValue] ?? parseInt(registerOrValue)) !== 0)
      this.pointer += parseInt(offset);
    else this.next();
  }

  run(program) {
    while (true) {
      if (this.pointer < 0 || this.pointer >= program.length) return this.a;

      const instruction = program[this.pointer];
      const command = instruction.substring(0, 3);
      const args = instruction.substring(4).split(" ");

      this[command](...args);
    }
  }
}

const program = input.split("\n");
const computer = new Computer();

console.log(computer.run(program));

computer.reset();
computer.c = 1;

console.log(computer.run(program));
