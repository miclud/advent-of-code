const input = require('./input/10');

function extractCoordinates(string) {
  const split = string
    .replace('<', '')
    .replace('>', '')
    .split(',');

  return {
    x: Number.parseInt(split[0], 10),
    y: Number.parseInt(split[1], 10),
  };
}

function parseInput(data) {
  return data
    .trim()
    .split('\n')
    .map((row) => {
      const regex = new RegExp(/<(-?\d+,-?\d+)>/, 'g');
      const [pos, vel] = row.replace(/\s+/g, '').match(regex);

      return {
        position: extractCoordinates(pos),
        velocity: extractCoordinates(vel),
      };
    });
}

function updatePositions(positions) {
  const updated = [];
  positions.forEach(({ position, velocity }) => {
    updated.push({
      position: { x: position.x + velocity.x, y: position.y + velocity.y },
      velocity,
    });
  });
  return updated;
}

function getHighest(data, varname) {
  let highest = -Infinity;
  data.forEach(({ position }) => {
    const { [varname]: variable } = position;
    if (variable > highest) {
      highest = variable;
    }
  });
  return highest;
}

function getLowest(data, varname) {
  let highest = Infinity;
  data.forEach(({ position }) => {
    const { [varname]: variable } = position;
    if (variable < highest) {
      highest = variable;
    }
  });
  return highest;
}

function print(data, highestX, lowestX, highestY, lowestY) {
  const mapped = data.reduce((acc, { position: { x, y } }) => {
    const key = `${y}_${x}`;
    return {
      ...acc,
      [key]: true,
    };
  }, {});

  let all = '';

  for (let i = lowestY; i <= highestY; i++) {
    let row = '';
    for (let j = lowestX; j <= highestX; j++) {
      const key = `${i}_${j}`;
      if (mapped[key]) {
        row += '#';
      } else {
        row += '.';
      }
    }
    row += '\n';
    all += row;
  }
  console.log(all); // Answer 1: => PPNJEENH
}

function findMessage(data) {
  let found = false;
  let smallestArea = Infinity;
  let currentPositions = data;
  let highestX = 0;
  let highestY = 0;
  let lowestY = 0;
  let lowestX = 0;
  let seconds = 0;

  while (!found) {
    const updatedPositions = updatePositions(currentPositions);

    highestX = getHighest(updatedPositions, 'x');
    highestY = getHighest(updatedPositions, 'y');
    lowestX = getLowest(updatedPositions, 'x');
    lowestY = getLowest(updatedPositions, 'y');
    const width = highestX - lowestX;
    const height = highestY - lowestY;
    const newArea = width * height;

    if (newArea < smallestArea) {
      smallestArea = newArea;
      currentPositions = updatedPositions;
    } else if (newArea >= smallestArea) {
      found = true;
      console.log(seconds); // Answer 2: => 10375
    }
    seconds++;
  }
  print(currentPositions, highestX, lowestX, highestY, lowestY);
}

const parsed = parseInput(input);
findMessage(parsed);
