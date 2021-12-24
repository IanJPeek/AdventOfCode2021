const { input, test } = require("./input");
let splitTest = test.split("\n");
let splitInput = input.split("\n");

let illegals = [];
let corruptedLines = [];
let incomplete = [];
let completeTotals = [];
for (let codeLine of splitInput) {
  let openStarts = [];
  let expectedEnd;
  const pairLookup = {
    "(": ")",
    "{": "}",
    "[": "]",
    "<": ">"
  };

  let isCorrupt = false;
  loop1: for (let char of codeLine) {
    if (isCorrupt) {
      break loop1;
    }
    switch (char) {
      case "(":
      case "{":
      case "[":
      case "<":
        openStarts.push(char);
        expectedEnd = pairLookup[char];
        break;

      case ")":
      case "}":
      case "]":
      case ">":
        char === expectedEnd
          ? (openStarts.pop(),
            (expectedEnd = pairLookup[openStarts[openStarts.length - 1]]))
          : (illegals.push(char),
            corruptedLines.push(codeLine),
            (isCorrupt = true));
        break;

      default:
        console.log("in default - error!", char);
    }
  }

  if (!isCorrupt) {
    incomplete.push(codeLine);

    let extraClosers = [];
    // reverse openStarts array
    for (let opener of openStarts) {
      extraClosers.unshift(opener);
    }
    // match with closing bracket
    let closingBracks = [];
    for (let opener of extraClosers) {
      let closer = pairLookup[opener];
      closingBracks.push(closer);
    }
    // make total from closingBracks
    let autoTotal = 0;

    for (let closer of closingBracks) {
      autoTotal = autoTotal * 5;

      if (closer === ")") {
        autoTotal = autoTotal + 1;
      }
      if (closer === "]") {
        autoTotal = autoTotal + 2;
      }
      if (closer === "}") {
        autoTotal = autoTotal + 3;
      }
      if (closer === ">") {
        autoTotal = autoTotal + 4;
      }
    }
    completeTotals.push(autoTotal);
  }
}

let illegalTotal = 0;
for (let char of illegals) {
  if (char === ")") {
    illegalTotal = illegalTotal + 3;
  }
  if (char === "]") {
    illegalTotal = illegalTotal + 57;
  }
  if (char === "}") {
    illegalTotal = illegalTotal + 1197;
  }
  if (char === ">") {
    illegalTotal = illegalTotal + 25137;
  }
}
console.log({ illegalTotal });
// pt. 1 = 374061

// order totals array & take middle value
completeTotals.sort(function(a, b) {
  return a - b;
});
const midPoint = Math.floor(completeTotals.length / 2);
const midValue = completeTotals[midPoint];
console.log({ midValue });
// pt. 2 = 2116639949