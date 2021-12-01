const { input, test } = require("./input");
const splitTest = test.split("\n").map(num => Number(num));
const splitInput = input.split("\n").map(num => Number(num));

const increaseCounter = arr => {
  let count = 0;
  for (let index in arr) {
    const num = arr[index];
    // if number is greater than previous number in array, increment count
    if (num > arr[index - 1]) {
      count++;
    }
  }
  return count;
};
const count = increaseCounter(splitInput);
console.log("increase count", count);
// pt. 1 = 1754

const threeTotaller = arr => {
  let sumCount = 0;
  for (let index in arr) {
    const num1 = arr[Number(index)];
    const num2 = arr[Number(index) + 1];
    const num3 = arr[Number(index) + 2];
    const num4 = arr[Number(index) + 3];
    const threeTotal = num1 + num2 + num3;
    const nextThreeTotal = num2 + num3 + num4;
    
    // if next three nums in array are greater than immediate three nums in array, increment count
    if (nextThreeTotal > threeTotal) {
      sumCount++;
    }
  }

  return sumCount;
};
const threeTotal = threeTotaller(splitInput);
console.log("increase in threeTotal count", threeTotal);
// pt 2. 1789
