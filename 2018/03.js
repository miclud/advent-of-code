const input = require('./input/03');

const parsed = input.split('\n').map((row) => {
  const [id, coords, area] = row.replace('@ ', '').split(' ');
  const [x, y] = area.replace('x', ',').split(',');
  const a = coords.replace(':', '').split(',');

  return {
    id,
    coords: {
      startX: Number.parseInt(a[0], 10),
      startY: Number.parseInt(a[1], 10)
    },
    area: { x: Number.parseInt(x, 10), y: Number.parseInt(y, 10) }
  };
});

const map = {};
let claimTotal = 0;

const has = new Set();
const not = new Set();

parsed.forEach(({ id, coords, area }) => {
  const { x, y } = area;
  const { startX, startY } = coords;

  for (let i = startX; i < startX + x; i++) {
    if (!map[i]) {
      map[i] = {};
    }

    for (let j = startY; j < startY + y; j++) {
      const currentNode = map[i][j] || new Set();
      currentNode.add(id);
      map[i][j] = currentNode;

      if (currentNode.size === 2) {
        claimTotal += 1;
      }

      if (currentNode.size >= 2) {
        currentNode.forEach((entry) => {
          has.add(entry);
        });
      }
    }
  }
});

parsed.forEach(({ id }) => {
  if (!has.has(id)) {
    not.add(id);
  }
});

console.log(claimTotal); // Part 1: => 100261
console.log(not); // Part 2: => 251
