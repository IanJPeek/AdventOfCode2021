const sampler = (arr, sampleSize = 20) => {
  const sampleArr = [];
  for (let itemNum in arr) {
    itemNum < sampleSize ? sampleArr.push(arr[itemNum]) : null;
  }
  // console.log("sampleArr", sampleArr);
  return sampleArr;
};

const totaller = numArr => {
  numArr = numArr.map(num => Number(num))
  let total = 0;
  for (let num of numArr) {
    total += num;
  }
  // console.log("total", total);
  return total;
};

// converts 2D array into object with values for xy coords {(0,0): "1", (1,0): "egText"}
// optional second paramter can convert values to Numbers 
const coordinator = (array2D, changeToNum=false) => {
  let coords = {};
  for (let rowNum in array2D) {
    const row = array2D[rowNum];
    for (let column in row) {
      !changeToNum ? 
      coords[`(${column},${rowNum})`] = array2D[rowNum][column] : 
      coords[`(${column},${rowNum})`] = Number(array2D[rowNum][column])
    }
  }
  return coords;
};

const yxCoordinator = array2D => {
  let coords = {};
  for (let rowNum in array2D) {
    const row = array2D[rowNum];
    for (let column in row) {
      coords[`(${rowNum},${column})`] = array2D[column][rowNum];
    }
  }
  return coords;
};

const printMap = array2D => {
  for (let row of array2D) {
    let rowString = "";
    for (let item of row) {
      rowString = rowString + item;
    }
    console.log(rowString);
  }
};

module.exports = { sampler, totaller, coordinator, printMap };
