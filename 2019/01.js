// const input = [12, 14, 1969, 100756];
const input = require('./input/01').split('\n');

let part1 = 0;
let part2 = 0;
input.forEach((mass) => {
  let fuel = Math.floor(mass / 3) - 2;
  part1 += fuel;
  let fuelUsages = fuel;

  while (fuel > 0) {
    fuel = Math.floor(fuel / 3) - 2;
    if (fuel > 0) {
      fuelUsages += fuel;
    }
  }
  part2 += fuelUsages;
});

console.log(`Part 1: ${part1}`); // => 3266516
console.log(`Part 2: ${part2}`); // => 4896902
