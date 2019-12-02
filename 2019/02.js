const input = require('./input/02');
const parsed = input.split(',').map((num) => Number(num));

const STOP = 99;
const MULTIPLY = 2;

function runProgram(initialMemory, noun, verb) {
  let pointer = 0;
  let run = true;
  const memory = [...initialMemory];
  memory[1] = noun;
  memory[2] = verb;

  while (run) {
    const action = memory[pointer];
    const arg1Position = memory[pointer + 1];
    const arg2Position = memory[pointer + 2];
    const storageLocation = memory[pointer + 3];

    if (action === STOP) {
      run = false;
    } else {
      const arg1 = memory[arg1Position];
      const arg2 = memory[arg2Position];

      const sum = action === MULTIPLY ? arg1 * arg2 : arg1 + arg2;
      memory[storageLocation] = sum;
      pointer += 4;
    }
  }
  return memory;
}

function getPart2() {
  for (let i = 0; i <= 99; i++) {
    for (let j = 99; j >= 0; j--) {
      const result = runProgram(parsed, i, j);
      if (result[0] === 19690720) {
        return 100 * i + j;
      }
    }
  }
}

const part1 = runProgram(parsed, 12, 2);

console.log(`Part 1: ${part1[0]}`); // => 6730673

const part2 = getPart2(parsed);
console.log(`Part 2: ${part2}`); // => 3749
