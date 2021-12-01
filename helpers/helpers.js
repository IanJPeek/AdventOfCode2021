const sampler = (arr, sampleSize = 20) => {
  const sampleArr = [];
  for (let itemNum in arr) {
    itemNum < sampleSize ? sampleArr.push(arr[itemNum]) : null;
  }
  // console.log("sampleArr", sampleArr);
  return sampleArr;
};

const totaller = numArr => {
  let total = 0;
  for (let num of numArr) {
    total += num;
  }
  // console.log("total", total);
  return total;
};

module.exports = { sampler, totaller };
