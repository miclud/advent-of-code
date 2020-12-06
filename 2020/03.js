const testInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
const input = require('./input/03');

const parsed = input.split('\n').map((row) => row.split(''));

const TREE = '#';

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

let slopeTrees = [];

slopes.forEach(([positionIncrement, rowIncrement]) => {
  let atBottom = false;
  let numHit = 0;
  let rowPosition = 0;
  let rowNumber = 0;
  const numRows = parsed.length;

  while (!atBottom) {
    const atLocation = parsed[rowNumber][rowPosition];
    if (atLocation === TREE) {
      numHit++;
    }

    rowNumber += rowIncrement;
    if (rowNumber >= numRows) {
      atBottom = true;
    }

    if (!atBottom) {
      const numElements = parsed[rowNumber].length;
      rowPosition = (rowPosition + positionIncrement) % numElements;
    }
  }
  slopeTrees.push(numHit);
});

console.log('Part 1:', slopeTrees[1]); // => 274

const total = slopeTrees.reduce((prev, curr) => prev * curr, 1);
console.log('Part 2:', total); // => 6050183040
