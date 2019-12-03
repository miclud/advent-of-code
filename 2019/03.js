const input = require('./input/03');

const parsed = input.split('\n').map((path) => path.trim().split(','));
const RIGHT = 'R';
const LEFT = 'L';
const DOWN = 'D';
const UP = 'U';

const getDirectionValue = (direction) => {
  const directionValueMap = {
    [LEFT]: -1,
    [RIGHT]: 1,
    [UP]: 1,
    [DOWN]: -1,
  };
  return directionValueMap[direction];
};

function getNextCoordinate(direction, x, y) {
  const directionVal = getDirectionValue(direction);
  let newY = y;
  let newX = x;
  if (direction === LEFT || direction === RIGHT) {
    newX = x + directionVal;
  } else {
    newY = y + directionVal;
  }

  return [newX, newY];
}

function draw(data) {
  const visited = new Map();
  data.forEach((path, index) => {
    let x = 0;
    let y = 0;
    let totalSteps = 0;
    for (let i = 0; i < path.length; i++) {
      const instruction = path[i];
      const direction = instruction.charAt(0);
      const steps = Number(instruction.substring(1));

      let doneSteps = 0;
      while (doneSteps < steps) {
        totalSteps += 1;
        [x, y] = getNextCoordinate(direction, x, y);
        const key = `${x},${y}`;
        if (!visited.has(key)) {
          const currentNode = new Map().set(index, totalSteps);
          visited.set(key, currentNode);
        } else {
          const current = visited.get(key);
          if (!current.has(index)) {
            current.set(index, totalSteps);
            visited.set(key, current);
          }
        }

        doneSteps++;
      }
    }
  });
  return visited;
}

const grid = draw(parsed);

let shortest = null;
let fewestSteps = null;

grid.forEach((node, key) => {
  if (node.size > 1) {
    const [x, y] = key.split(',').map((val) => Number(val));
    const distance = Math.abs(x) + Math.abs(y);

    if (shortest === null || distance < shortest) {
      shortest = distance;
    }

    const numSteps = node.get(0) + node.get(1);
    if (fewestSteps === null || numSteps < fewestSteps) {
      fewestSteps = numSteps;
    }
  }
});

console.log('Part 1', shortest); // => 865
console.log('Part 2', fewestSteps); // => 35038
