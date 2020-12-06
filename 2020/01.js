const inputTest = `1721
979
366
299
675
1456`;
const input = require('./input/01');

const parsed = input.split('\n').map((entry) => Number(entry.trim()));

let foundFirst = false;
let foundSecond = false;
let index = 0;
const MAGIC_NUMBER = 2020;

while (!foundFirst || !foundSecond) {
  const current = parsed[index];
  for (let i = index + 1; i < parsed.length; i++) {
    const next = parsed[i];
    if (current + next === MAGIC_NUMBER) {
      console.log('Result part 1', next * current); // => 646779
      foundFirst = true;
    }

    for (let j = index + 2; j < parsed.length; j++) {
      const next2 = parsed[j];

      if (current + next + next2 === MAGIC_NUMBER) {
        console.log('Result part 2', next * current * next2); // => 246191688
        foundSecond = true;
      }
    }
  }
  index++;
}
