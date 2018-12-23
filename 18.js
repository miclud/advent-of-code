const TREE = '|';
const OPEN = '.';
const LUMBERYARD = '#';
const input = require('./input/18');

function createHash(grid) {
  return grid.map((row) => row.join('')).join('');
}

function cloneGrid(grid) {
  return grid.map((arr) => [...arr]);
}

function parseInput(data) {
  return data
    .trim()
    .split('\n')
    .map((row) => row.trim().split(''));
}

function getNumberOf(type, grid) {
  let num = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      const thing = grid[x][y];
      if (thing === type) {
        num++;
      }
    }
  }
  return num;
}

function getValue(grid) {
  const trees = getNumberOf(TREE, grid);
  const lumberyards = getNumberOf(LUMBERYARD, grid);
  return trees * lumberyards;
}

function getChange(x, y, grid) {
  const current = grid[x][y];
  const coordinateChanges = [-1, 0, 1];

  let trees = 0;
  let lumberyards = 0;

  coordinateChanges.forEach((xIncrement) => {
    const newX = x + xIncrement;
    const row = grid[newX] || [];

    coordinateChanges.forEach((yIncrement) => {
      const newY = y + yIncrement;
      const isSameAsCurrent = newX === x && newY === y;
      if (!isSameAsCurrent) {
        const type = row[newY] || null;
        if (type === LUMBERYARD) {
          lumberyards++;
        } else if (type === TREE) {
          trees++;
        }
      }
    });
  });

  let returnValue = current;

  if (current === OPEN && trees >= 3) {
    returnValue = TREE;
  } else if (current === TREE && lumberyards >= 3) {
    returnValue = LUMBERYARD;
  } else if (current === LUMBERYARD) {
    if (lumberyards >= 1 && trees >= 1) {
      returnValue = LUMBERYARD;
    } else {
      returnValue = OPEN;
    }
  }
  return returnValue;
}

function doTheLoop(grid, times) {
  let current = cloneGrid(grid);

  let minutes = 0;

  while (minutes < times) {
    const gridWithChanges = [];
    for (let x = 0; x < grid.length; x++) {
      const updatedRow = [];
      for (let y = 0; y < grid[0].length; y++) {
        const change = getChange(x, y, current);
        updatedRow[y] = change;
      }
      gridWithChanges[x] = updatedRow;
    }
    current = cloneGrid(gridWithChanges);
    minutes++;
  }
  return current;
}

function getPart2(initialGrid, stateAtIteration) {
  let run = true;
  let iterations = 1;
  const gridVersions = {};
  gridVersions[0] = initialGrid;
  const hashes = new Map();
  hashes.set(createHash(initialGrid), 0);
  let currentGrid = initialGrid;

  let equalAt = 0;
  let foundAt = 0;
  while (run) {
    const updated = doTheLoop(currentGrid, 1);
    const hash = createHash(updated);

    if (hashes.has(hash)) {
      equalAt = hashes.get(hash);
      foundAt = iterations;
      run = false;
    } else {
      hashes.set(hash, iterations);
      gridVersions[iterations] = updated;
    }
    currentGrid = cloneGrid(updated);
    iterations++;
  }

  const periodLength = foundAt - equalAt;
  const indexOfThing = ((stateAtIteration - equalAt) % periodLength) + equalAt;
  return getValue(gridVersions[indexOfThing]);
}

const parsed = parseInput(input);
const after10Min = doTheLoop(parsed, 10);
console.log('Part 1:', getValue(after10Min)); // => 634800

const part2 = getPart2(parsed, 1000000000);
console.log('Part 2:', part2); // => 195952
