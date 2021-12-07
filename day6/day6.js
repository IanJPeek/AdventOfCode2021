const { input, test } = require("./input");
let splitTest = test.split(",");
let splitInput = input.split(",");

// part 1 - model/ display fish array + count fish nums (good for approx 190+ days)
const dayModeller = (lanternArr, days = 1) => {
  let nextDayArr = [];
  let fryArr = [];

  while (days > 0) {
    for (let fish of lanternArr) {
      // console.log("lanternArr", lanternArr)
      fish--;
      fish === 0 ? fryArr.push(9) : null;
      nextDayArr.push(fish);
    }

    // console.log("Fish:", nextDayArr)  // uncomment for model/ display of fish array
    console.log(`nextDayArr, ${days-1} days left, fish number:`, nextDayArr.length) // uncomment for days 
    nextDayArr = nextDayArr.map(fish => (fish === 0 ? 7 : fish));
    nextDayArr = nextDayArr.concat(fryArr);
    // console.log("nextDay + fry", nextDayArr);
    lanternArr = nextDayArr;
    days = days - 1;
    nextDayArr = [];
    fryArr = [];
  }
}
// dayModeller(splitTest, 190)

// part 2 - re-model for fish numbers up to 256 days (with exponential growth) ...
const exponentialModeller = (lanternArr, days=1) => {

  const ocean = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
  }

  // initialise ocean from array
  for (let fish of lanternArr){
    switch (fish) {
      case "0":
        ocean["0"] = ocean["0"] + 1;
        break;
      case "1":
        ocean["1"] = ocean["1"] + 1;
        break;
      case "2":
        ocean["2"] = ocean["2"] + 1;
        break;
      case "3":
        ocean["3"] = ocean["3"] + 1;
        break;
      case "4":
        ocean["4"] = ocean["4"] + 1;
        break;
      case "5":
        ocean["5"] = ocean["5"] + 1;
        break;
      case "6":
        ocean["6"] = ocean["6"] + 1;
        break;
      case "7":
        ocean["7"] = ocean["7"] + 1;
        break;
      case "8":
        ocean["8"] = ocean["8"] + 1;
        break;
    }
  }
  console.log("init", { ocean });

  let fry = 0
  let respawn = 0

  while (days>0) {
  // reduce fish ages, assign (fry + respawn)
  for (let fishAge in ocean){
    switch (fishAge) {
      case "0":
        fry = ocean["0"];
        respawn = ocean["0"];
        break;
      case "1":
        ocean["0"] = ocean["1"]
        break;
      case "2":
        ocean["1"] = ocean["2"];
        break;
      case "3":
        ocean["2"] = ocean["3"];
        break;
      case "4":
        ocean["3"] = ocean["4"];
        break;
      case "5":
        ocean["4"] = ocean["5"];
        break;
      case "6":
        ocean["5"] = ocean["6"];
        break;
      case "7":
        ocean["6"] = ocean["7"];
        break;
      case "8":
        ocean["7"] = ocean["8"];
        ocean["8"] = fry
        break;
    }
  }
  ocean["8"] = fry;
  ocean["6"] = ocean["6"] + respawn
  fry = 0
  respawn = 0
  days -= 1
}
  console.log({ocean})

  // total fish in ocean
  let total = 0
  for (let fish in ocean){
    total += ocean[fish]
  }
  console.log(total)
}
exponentialModeller(splitInput, 256)
// pt 2. 1653559299811
