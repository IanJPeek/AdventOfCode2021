const { input, test } = require("./input");
let { totaller } = require("../helpers/helpers");

let splitTest = test.split(",");
let splitInput = input.split(",");

console.log("start", splitTest);

// let arrayMax = 10000000;
let arrayMax = 9000000;

const arrSplitter = longArr => {
  arrayMax = 9000000;
  const splitFishArr = [];
  let fishArr = [];

  for (let i = 0; i < longArr.length; i++) {
    if (i < arrayMax) {
      fishArr.push(longArr[i]);
    } else {
      console.log("in else", i)
      splitFishArr.push(fishArr);
      fishArr = [];
      arrayMax = arrayMax + 9000000;
    }
  }
  splitFishArr.push(fishArr)
  console.log("splitFishArr", splitFishArr);
  return splitFishArr;
};

let allCapped = [] // new arr of all "processed" lanterns (no fry), should be several arrays?

// all processedFish added to cappedArr, pushed to allCapped  (fry added later)
const processFish = (lanternArr) => {
  const cappedArr = []
  // console.log("in process fish", lanternArr)
for (let fish of lanternArr) {
      // if (nextDayArr.length < arrayMax) {
        fish--;
        fish === 0 ? fryArr.push(9) : null;
        cappedArr.push(fish);
      }
      allCapped.push(cappedArr)
      return cappedArr
    // }
}
  let fryArr = [];

const dayModeller = (lanternArr, days = 1) => {
  let nextDayArr = [];
  // let surplusArr = [];
  // let reserveArr = [];
  // let fryArr = [];
  let splitFishArr = []

  
  while (days > 0) {
    for (let smallArr of lanternArr){
//  console.log("smallArr", smallArr)

    // console.log("lanternArr length:", lanternArr.length)

    // if(typeof lanternArr[0] === "number"){

      if (smallArr.length > arrayMax) {
        console.log("\nsmallArr greater than", arrayMax, "splitting", smallArr.length, "size arr");
        splitFishArr = arrSplitter(smallArr);
        console.log("returned splitFish with", splitFishArr.length, splitFishArr[0].length, splitFishArr[1].length)

        for (let arr of splitFishArr) {
          smallArr = arr;
          processFish(smallArr); // works through all capped arrays + populates fryArr
          console.log("processed a splitArr")
        }

        // reassign after splitArr processed?


      } else {
        console.log("\nhandling nonSuperMasive arr")
        nextDayArr = processFish(smallArr);
      }

    // original solve
    // if (lanternArr.length > arrayMax) {
    //   console.log("lanternArr greater than", arrayMax, "splitting");
    //   splitFishArr = arrSplitter(lanternArr);
    //   console.log("returned splitFish with", splitFishArr.length);
    //   for (let arr of splitFishArr){
    //     lanternArr = arr
    //     processFish(lanternArr) // works through all capped arrays + populates fryArr
    //   } 
    // }
    // else{nextDayArr = processFish(lanternArr)}

  }

    if (nextDayArr.length < arrayMax) {
      console.log("days", days, "fishcount:", nextDayArr.length);
      console.log("days", days, "fishcount:", allCapped[0].length);
      // console.log("allCapped?", allCapped.length, allCapped[0].length);

      if (allCapped[1]){
        console.log("AND", allCapped[1].length)
      }
      nextDayArr = nextDayArr.map(fish => (fish === 0 ? 7 : fish));
      nextDayArr = nextDayArr.concat(fryArr);
      console.log("\nnextDay + fry", nextDayArr.length)
      lanternArr = [nextDayArr]; // still has problem when too big
      
      // lanternArr = nextDayArr; // still has problem when too big

      
      // console.log(nextDayArr);
      
      for (let arr of allCapped){ arr = arr.map(fish => (fish === 0 ? 7 : fish));}
      console.log("allcapMapped", allCapped[0].length, allCapped.length)
      // allCapped = allCapped[0].concat(fryArr)
      allCapped = allCapped[allCapped.length-1].concat(fryArr);
      
      console.log("allcapMapped + fry", allCapped.length);
      // lanternArr = [allCapped]


      // lanternArr = allCapped.map(arr => arr)
      
      // lanternArr = [lanternArr]
      // allCapped.push(fryArr)
      // lanternArr = [allCapped]
      // lanternArr = allCapped
      
      days = days - 1;

      nextDayArr = [];
      fryArr = [];
      allCapped = []
    } 
    else {console.log("WHY HERE??")}
  }

  // console.log(nextDayArr);
  return lanternArr;
};
// const finalArr = dayModeller(splitInput, 80); // pt. 1 = 366057
// console.log(splitInput)
// console.log([splitInput])
const finalArr = dayModeller([splitInput], 80); // pt. 1 = 366057  // 141 days left - splits () // fine up to 120

// console.log({allCapped})

// 150 - 71 days left correct  35 => 34 days - problem!

// fishcount becomes empty at 141, after splitFish?
// properly use allCapped?


// const finalArr = dayModeller(splitTest, 80); // pt. 1 = 366057


// console.log({finalArr})
// let arrayMax = 10000000 // (8 digits)
