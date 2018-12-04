const input = require('./input/04');

function getDate(entry) {
  const dateString = entry.substring(1, 17);
  return new Date(dateString);
}

function getAction(entry) {
  return entry.substring(19).split(' ');
}

function sortByDate(data) {
  return data.sort(
    ({ date: firstDate }, { date: secondDate }) => firstDate - secondDate
  );
}

function parseInput(data) {
  return data
    .trim()
    .split('\n')
    .map((entry) => ({
      date: getDate(entry),
      action: getAction(entry),
    }));
}

const parsed = parseInput(input);
const sorted = sortByDate(parsed);

function getUpdatedMap(currentMap, start, end) {
  const mapped = {};
  for (let i = start; i < end; i++) {
    const current = currentMap[i] || 0;
    mapped[i] = current + 1;
  }
  return { ...currentMap, ...mapped };
}

function handle(data) {
  let round = 0;
  let currentGuard = null;
  let currentStartMinute = null;
  const guards = new Map();

  while (round < data.length) {
    const { date, action } = data[round];
    const kind = action[0];
    if (kind === 'Guard') {
      currentGuard = Number.parseInt(action[1].substring(1), 10);
      if (!guards.has(currentGuard)) {
        guards.set(currentGuard, { totalMinutes: 0, sleepMap: {} });
      }
    } else if (kind === 'falls') {
      currentStartMinute = date.getMinutes();
    } else if (kind === 'wakes') {
      const currentEnd = date.getMinutes();

      const guardData = guards.get(currentGuard);
      const newSum = guardData.totalMinutes + (currentEnd - currentStartMinute);

      const guardMap = getUpdatedMap(
        guardData.sleepMap,
        currentStartMinute,
        currentEnd
      );
      guards.set(currentGuard, { sleepMap: guardMap, totalMinutes: newSum });
    } else {
      console.log('unknown action', kind);
    }

    round += 1;
  }

  return guards;
}

const guardMap = handle(sorted);

let mostSleep = 0;
let mostSleepEntry = null;

let highestSleepCount = 0;
let mostSleepyGuard = 0;
let mostSleepyMinute = 0;

guardMap.forEach(({ totalMinutes, sleepMap }, id) => {
  if (totalMinutes > mostSleep) {
    mostSleepEntry = id;
    mostSleep = totalMinutes;
  }

  Object.entries(sleepMap).forEach(([key, value]) => {
    if (value > highestSleepCount) {
      highestSleepCount = value;
      mostSleepyMinute = Number.parseInt(key, 10);
      mostSleepyGuard = id;
    }
  });
});

const guardWithLongestSeep = guardMap.get(mostSleepEntry);

let minute = 0;
let count = 0;

Object.entries(guardWithLongestSeep.sleepMap).forEach(([key, value]) => {
  if (value > count) {
    minute = key;
    count = value;
  }
});

console.log('Part 1', mostSleepEntry * minute); // => 20859
console.log('Part 2', mostSleepyGuard * mostSleepyMinute); // => 76576
