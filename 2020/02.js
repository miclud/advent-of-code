const inputTest = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

const input = require('./input/02');

const parsed = input.split('\n').map((entry) => {
  const [policy, char, password] = entry.split(' ');
  console.log(char);
  const [min, max] = policy.split('-').map((num) => Number(num.trim()));
  return {
    password,
    char: char.replace(':', '').trim(),
    min,
    max,
  };
});

let valid = 0;
let valid2 = 0;

parsed.forEach(({ password, char, min, max }) => {
  const chars = password.split('');
  const number = chars.filter((entry) => entry === char).length;

  if (number > 0) {
    if (number >= min && number <= max) {
      valid++;
    }

    const foundMin = chars[min - 1] === char;
    const foundMax = chars[max - 1] === char;
    if (foundMin !== foundMax) {
      valid2++;
    }
  }
});

console.log('Part 1', valid); // => 666
console.log('Part 2', valid2); // => 670
