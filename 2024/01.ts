const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

import { input } from "./input/01.ts";

let left: Array<Number> = [];
let right: Array<Number> = [];

input.split("\n").forEach((row) => {
  const [l, r] = row.split("  "); // split dobule space, lol

  left.push(Number(l.trim()));
  right.push(Number(r.trim()));
});

right = right.sort();
left = left.sort();

let sum = 0;
let similarityScore = 0;
left.forEach((l, index) => {
  // Part 1
  const r = right[index];
  const distance = Math.abs(l - r);
  sum += distance;

  // Part 2
  const timesInRight = right.filter((r) => r === l);
  const similartiy = l * timesInRight.length;

  similarityScore += similartiy;
});

console.log(`Part 1: ${sum}`); // => 2378066
console.log(`Part 2: ${similarityScore}`); // => 18934359
