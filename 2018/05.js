const input = require('./input/05');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getPart1(string) {
  let finished = false;

  let currentString = string;
  while (!finished) {
    let hadUpdates = false;
    alphabet.forEach((char) => {
      let reg = char + char.toLowerCase();
      let updated = currentString.replace(reg, '');
      if (updated !== currentString) {
        hadUpdates = true;
      }
      currentString = updated;

      reg = char.toLowerCase() + char;
      updated = currentString.replace(reg, '');

      if (updated !== currentString && !hadUpdates) {
        hadUpdates = true;
      }
      currentString = updated;
    });

    if (!hadUpdates) {
      finished = true;
    }
  }
  return currentString;
}

function getPart2(string, initialShortest) {
  let shortest = initialShortest;

  alphabet.forEach((char) => {
    let re = new RegExp(char, 'g');
    let testString = string.replace(re, '');
    re = new RegExp(char.toLowerCase(), 'g');
    testString = testString.replace(re, '');
    const result = getPart1(testString);
    if (result.length < shortest) {
      shortest = result.length;
    }
  });
  return shortest;
}

const res = getPart1(input);
const answer1 = res.length;
console.log('Part 1: ', answer1); // => 10762

const part2 = getPart2(input, answer1);
console.log('Part 2', part2); // => 6946
