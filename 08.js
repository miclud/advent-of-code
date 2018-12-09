const input = require('./input/08')
  .split(' ')
  .map((entry) => Number.parseInt(entry, 10));

function buildChildren(values, currentIndex, numChildren) {
  const children = [];
  let currKey = currentIndex + 2; // Skip the header.
  let rounds = 0;

  while (rounds < numChildren) {
    const childNodeNum = values[currKey];
    const childNodeMetaData = values[currKey + 1];
    const childNode = {
      numMetaData: childNodeMetaData,
      children: [],
    };

    if (childNodeNum === 0) {
      childNode.metaDataStart = currKey + 2;
    } else {
      const childNodes = buildChildren(values, currKey, childNodeNum);
      childNode.children = childNodes;
      const lastChild = childNodes[childNodes.length - 1];

      const childStart = lastChild.metaDataStart;
      const childNum = lastChild.numMetaData;

      childNode.metaDataStart = childStart + childNum;
    }

    currKey = childNode.metaDataStart + childNodeMetaData;
    children.push(childNode);

    rounds++;
  }

  return children;
}

const root = {
  numMetaData: input[1],
  metaDataStart: -input[1],
  children: [],
};

const restOfTree = buildChildren(input, 0, input[0]);
root.children = restOfTree;

function getAnswer1(data, startNode, initialSum) {
  let sum = initialSum;
  startNode.children.forEach((child) => {
    sum += getAnswer1(data, child, initialSum);
  });

  const { numMetaData, metaDataStart } = startNode;
  const metaDataEntries =
    metaDataStart > 0
      ? data.slice(metaDataStart, metaDataStart + numMetaData)
      : data.slice(metaDataStart);
  sum += metaDataEntries.reduce((acc, curr) => acc + curr, 0);
  return sum;
}

function getAnswer2(data, startNode, initialSum) {
  let sum = initialSum;

  const { numMetaData, metaDataStart, children } = startNode;
  const metaDataEntries =
    metaDataStart > 0
      ? data.slice(metaDataStart, metaDataStart + numMetaData)
      : data.slice(metaDataStart);

  if (children.length === 0) {
    sum += metaDataEntries.reduce((acc, curr) => acc + curr, 0);
  } else {
    metaDataEntries.forEach((entry) => {
      if (entry === 0) {
        return;
      }

      const child = children[entry - 1] || null;
      if (child) {
        sum += getAnswer2(data, child, initialSum);
      }
    });
  }
  return sum;
}

console.log('Answer 1: ', getAnswer1(input, root, 0)); // => 44893
console.log('Answer 2: ', getAnswer2(input, root, 0)); // => 27433
