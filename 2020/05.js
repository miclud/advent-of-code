const inputTest = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

const input = require('./input/05').split('\n');

function getId(row, column) {
  return row * 8 + column;
}

function getNumber(hash) {
  const upper = ['B', 'R'];
  const binary = hash
    .split('')
    .map((r) => (upper.includes(r) ? 1 : 0))
    .join('');

  return Number.parseInt(binary, 2);
}

let highest = 0;

const flightMap = [];

input.forEach((string) => {
  const rowData = string.substring(0, 7);
  const columnData = string.substring(7);

  const row = getNumber(rowData);
  const column = getNumber(columnData);
  const id = getId(row, column);

  if (!flightMap[row]) {
    flightMap[row] = [];
  }
  flightMap[row][column] = id;

  if (id > highest) {
    highest = id;
  }
});

console.log('Part 1', highest); // => 996

console.log('flight map', flightMap); //=> see in console missing 671
