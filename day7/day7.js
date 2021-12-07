const { input, test } = require("./input");
let { totaller } = require("../helpers/helpers");
let sortTest = test.split(",").map(Number);
let sortInput = input.split(",").map(Number);

const scaleDifference = num => {
  const numsToSum = []; // lists sum for triangle numbers eg for 4 [1,2,3,4]
  for (let i = 0; i < num + 1; i++) {
    numsToSum.push(i);
  }
  const scaledDiff = totaller(numsToSum);
  return scaledDiff;
};

const distanceFinder = sortArr => {
  const min = Math.min(...sortArr);
  const max = Math.max(...sortArr);
  const allDistances = [];
  const allTotals = [];

  // check distances from values btwn min/ max of inital arr
  for (let i = min; i < max; i++) {
    const distances = [];

    // check distances from ... (ONLY for values from initial array)
    for (let num of sortArr) {
      const difference = Math.abs(num - i);
      const scaledDifference = scaleDifference(difference);

      // distances.push(difference) // pt.1 - simple difference => pt.2 scaled difference
      distances.push(scaledDifference);
    }
    allDistances.push(distances); // allDistances from a horizontal point
    allTotals.push(totaller(distances)); // total distance from that point
  }
  return Math.min(...allTotals);
};
const leastFuel = distanceFinder(sortInput);
console.log("least fuel:", leastFuel);
// pt. 1 = 328318
// pt.2 = 89791146
