function checkNumber(number, canBeLargeGroup) {
  const split = number
    .toString()
    .split('')
    .map((val) => Number(val));

  // Short circuit.
  if ([0, 1].includes(split[5])) {
    return false;
  }

  const distinct = [...new Set(split)];
  if (distinct.length === 6 || (!canBeLargeGroup && distinct.length === 1)) {
    return false;
  }

  let hasGroupOfExactlyTwo = false;
  let currentDigit = -1;
  let currentInARow = 0;

  for (let index = 0; index < split.length; index++) {
    const digit = split[index];

    if (currentDigit === digit) {
      currentInARow += 1;
    } else {
      if (currentInARow === 2 && !hasGroupOfExactlyTwo) {
        hasGroupOfExactlyTwo = true;
      }

      currentDigit = digit;
      currentInARow = 1;
    }

    const nextIndex = index + 1;
    const canCheckNext = nextIndex < split.length;

    // Check decrease
    if (canCheckNext) {
      const next = split[index + 1];

      if (next < digit) {
        return false;
      }
    }
  }

  return canBeLargeGroup || currentInARow === 2 || hasGroupOfExactlyTwo;
}

function doIt() {
  const from = 123257;
  const to = 647015;

  const possiblePart1 = [];
  const possiblePart2 = [];
  for (let i = from; i <= to; i++) {
    if (checkNumber(i, true)) {
      possiblePart1.push(i);
    }

    if (checkNumber(i, false)) {
      possiblePart2.push(i);
    }
  }

  console.log('Part 1:', possiblePart1.length); // => 2220
  console.log('Part 2:', possiblePart2.length); // => 1515
}

doIt();
