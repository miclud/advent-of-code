'use strict';

function getPart1(input) {
  let hasTwo = 0;
  let hasThree = 0;

  input.forEach(id => {
    const charCount = new Map();
    id.split('').forEach(char => {
      if (charCount.has(char)) {
        const currentCount = charCount.get(char);
        charCount.set(char, currentCount + 1);
      } else {
        charCount.set(char, 1);
      }
    });

    let foundThree = false;
    let foundTwo = false;

    charCount.forEach(value => {
      if (value === 2 && !foundTwo) {
        foundTwo = true;
        hasTwo++;
      } else if (value === 3 && !foundThree) {
        hasThree++;
        foundThree = true;
      }
    });
  });

  return hasTwo * hasThree;
}

function getPart2(inputs) {
  const sorted = parsed.sort();
  const stringLength = sorted[0].length;

  for (let i = 0; i < sorted.length; i++) {
    const first = sorted[i];
    for (let j = i + 1; j < i + stringLength; j++) {
      const second = sorted[j];
      let diff = 0;
      let diffPos = -1;

      for (let k = 0; k < stringLength; k++) {
        const firstChar = first.charAt(k);
        const secondChar = second.charAt(k);
        if (firstChar !== secondChar) {
          diff++;
          diffPos = k;
        }
        if (diff > 1) {
          continue;
        }
      }
      if (diff === 1) {
        return first
          .split('')
          .filter((char, index) => {
            return index !== diffPos;
          })
          .join('');
      }
    }
  }
}

const input = require('./input/02');
const parsed = input.trim().split('\n');

const answer1 = getPart1(parsed);
console.log(answer1); // => 5681
const answer2 = getPart2(parsed);
console.log(answer2); // => uqyoeizfvmbistpkgnocjtwld
