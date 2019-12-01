'use  strict';

const input = require('./input/01');
const inputArray = input
  .split('\n')
  .map(entry => Number.parseInt(entry.trim(), 10));

function findDuplicate(inputArray) {
  const usedFreqs = new Set();

  let currFreq = 0;
  let loc = 0;
  const length = inputArray.length;
  let notDup = true;
  while (notDup) {
    if (loc >= length) {
      loc = 0;
    }

    const num = inputArray[loc];
    currFreq += num;
    if (usedFreqs.has(currFreq)) {
      notDup = false;
    }
    usedFreqs.add(currFreq);
    loc++;
  }

  return currFreq;
}

const result1 = inputArray.reduce((acc, curr) => {
  return (acc += curr);
});

console.log(result1); // => 582

const result2 = findDuplicate(inputArray);
console.log(result2); // => 488
