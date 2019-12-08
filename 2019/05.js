const input = require('./input/05');

const parsed = input.split(',').map((num) => Number(num));

const STOP = 99;
const MULTIPLY = 2;
const INPUT = 3;
const OUTPUT = 4;
const JUMP_IF_TRUE = 5;
const JUMP_IF_FALSE = 6;
const LESS_THAN = 7;
const EQUALS = 8;

const POSITION_MODE = 0;

function shouldJump(action, param1) {
  return action === JUMP_IF_TRUE ? param1 !== 0 : param1 === 0;
}

function calculateResult(action, param1, param2) {
  if (action === LESS_THAN) {
    return param1 < param2 ? 1 : 0;
  }
  if (action === EQUALS) {
    return param1 === param2 ? 1 : 0;
  }
  return action === MULTIPLY ? param1 * param2 : param1 + param2;
}

function runProgram(initialMemory, inputArg) {
  let pointer = 0;
  const memory = [...initialMemory];

  while (pointer < memory.length) {
    const instruction = memory[pointer];
    const r = instruction.toString().split('');
    const action = Number([r.pop(), r.pop()].reverse().join(''));
    const arg1Mode = Number(r.pop() || POSITION_MODE);
    const arg2Mode = Number(r.pop() || POSITION_MODE);
    const arg1Position = memory[pointer + 1];

    if (action === INPUT) {
      memory[arg1Position] = inputArg;
      pointer += 2;
    } else if (action === OUTPUT) {
      const output = memory[arg1Position];
      if (output !== 0 && memory[pointer + 2] === STOP) {
        return output;
      }
      pointer += 2;
    } else {
      const arg2Position = memory[pointer + 2];
      const storageLocation = memory[pointer + 3];
      const param1 =
        arg1Mode === POSITION_MODE ? memory[arg1Position] : arg1Position;
      const param2 =
        arg2Mode === POSITION_MODE ? memory[arg2Position] : arg2Position;

      if (action === JUMP_IF_TRUE || action === JUMP_IF_FALSE) {
        if (shouldJump(action, param1)) {
          pointer = param2;
        } else {
          pointer += 3;
        }
      } else {
        memory[storageLocation] = calculateResult(action, param1, param2);
        pointer += 4;
      }
    }
  }
  return memory;
}

const result1 = runProgram(parsed, 1);
console.log(result1); // => 5182797

const result2 = runProgram(parsed, 5);
console.log(result2); // => 12077198
