const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const input = require('./input/06');

const parsed = input.split('\n\n').map((row) => {
  const clean = row
    .trim()
    .replace(/\n/g, ' ')
    .split('')
    .filter((r) => r !== ' ');
  return new Set([...clean]);
});

let sum = parsed.reduce((prev, curr) => {
  return prev + curr.size;
}, 0);

console.log('Part 1:', sum); // => 7120

const parsed2 = testInput.split('\n\n').map((row) => {
  const clean = row.trim().replace(/\n/g, ' ');
  return clean;
});

let part2 = 0;

parsed2.forEach((group) => {
  const groupAnswers = {};

  const eachPerson = group.split(' ').filter((r) => r !== ' ');
  const peopleInGroup = eachPerson.length;

  eachPerson.forEach((personAnswers) => {
    personAnswers.split('').forEach((answer) => {
      if (!groupAnswers[answer]) {
        groupAnswers[answer] = 0;
      }
      groupAnswers[answer] += 1;
    });
  });

  const sameAnswer = Object.values(groupAnswers).reduce((prev, curr) => {
    if (curr === peopleInGroup) {
      return prev + 1;
    }
    return prev;
  }, 0);
  part2 += sameAnswer;
});

console.log('Part 2', part2); // => 3570
