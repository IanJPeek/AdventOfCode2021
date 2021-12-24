const { input, test, single } = require("./input");
let splitSingle = single.split("\n");
let splitTest = test.split("\n");
let splitInput = input.split("\n");

// console.log("test", splitTest)
// console.log("input", splitInput);

const inputParser = input => {
  const displayArr = [];

  for (let info of input) {
    // parse input into displayArr[] : {signalPatterns[], outputs[]}
    let [signalPatterns, output] = info.split(" | ");
    signalPatterns = signalPatterns.split(" ");
    outputs = output.split(" ");

    const display = {
      signalPatterns,
      outputs
    };
    displayArr.push(display);
  }

  return displayArr;
};
// const displayArr = inputParser(splitSingle);
const displayArr = inputParser(splitInput);


// console.log(displayArr)

const uniqueDigitCounter = displayArr => {
  let uniqueDigitTotal = 0;

  for (let display of displayArr) {
    for (let digit of display.outputs) {
      if (
        digit.length === 2 ||
        digit.length === 3 ||
        digit.length === 4 ||
        digit.length === 7
      ) {
        uniqueDigitTotal += 1;
      }
    }
  }
  return uniqueDigitTotal;
};
const uniqueDigitTotal = uniqueDigitCounter(displayArr);
// console.log({uniqueDigitTotal})  // pt.1 = 554

// PT 2

    let allOutputNums = [];


const findUniqueDigits = displayArr => {
  // let wireConfigs = {
  //   isZero : null,
  //   isOne: null,
  //   isTwo: null,
  //   isThree: null,
  //   isFour: null,
  //   isFive: null,
  //   isSix: null,
  //   isSeven: null,
  //   isEight: null,
  //   isNine: null
  // }

  for (let display of displayArr) {
    let wireConfigs = {
      isZero: [],
      isOne: null,
      isTwo: [],
      isThree: [],
      isFour: null,
      isFive: [],
      isSix: [],
      isSeven: null,
      isEight: null,
      isNine: []
    };

    // assign wireConfigs - possible configs for each digit
    for (let someDigit of display.signalPatterns) {
      if (someDigit.length === 2) {
        wireConfigs.isOne = someDigit;
      }
      if (someDigit.length === 3) {
        wireConfigs.isSeven = someDigit;
      }
      if (someDigit.length === 4) {
        wireConfigs.isFour = someDigit;
      }
      if (someDigit.length === 7) {
        wireConfigs.isEight = someDigit;
      }
      if (someDigit.length === 5) {
        wireConfigs.isTwo.push(someDigit);
        wireConfigs.isThree.push(someDigit);
        wireConfigs.isFive.push(someDigit);
      }
      if (someDigit.length === 6) {
        wireConfigs.isZero.push(someDigit);
        wireConfigs.isSix.push(someDigit);
        wireConfigs.isNine.push(someDigit);
      }
    }
    display["wireConfigs"] = wireConfigs;

    // identify 3 config
    let threeSegments = [];
    let sharedTwice = [];

    // split configs into indiviual letters (segments)
    for (let config of wireConfigs.isThree) {
      let segments = config.split(""); // obtains 5 x letters ("segments") used in 3's display
      threeSegments.push(segments);
    }

    for (let config of threeSegments) {
      // for three - 2 & 5 both share one segment with 3 (the TR or BR), eg "a" + "b"
      for (let segment of config) {
        // find the two letters (segments) common to two configs. The config with both is 3. ("a" vs "b" vs "ab")
        // ("TR" vs "BR" vs "TR & BR")

        if (
          (threeSegments[0].includes(segment) &&
            threeSegments[1].includes(segment) &&
            !threeSegments[2].includes(segment)) ||
          (threeSegments[0].includes(segment) &&
            threeSegments[2].includes(segment) &&
            !threeSegments[1].includes(segment)) ||
          (threeSegments[1].includes(segment) &&
            threeSegments[2].includes(segment) &&
            !threeSegments[0].includes(segment))
        ) {
          // push shared letters from configs (topR + bottomR) into identifier array
          if (!sharedTwice.includes(segment)) {
            sharedTwice.push(segment);
          }

          // if both shared letters (segments) have been pushed & the config has both - 3 has been identified
          if (
            sharedTwice.length === 2 &&
            config.includes(sharedTwice[0]) &&
            config.includes(sharedTwice[1])
          ) {
            // update isThree with correct config value (+ remove this possibility from isTwo + isFive)
            // write isThree
            let configString = "";
            for (let segment of config) {
              configString = configString + segment;
            }
            wireConfigs.isThree = configString;

            // remove possible value from isTwo
            wireConfigs.isTwo = wireConfigs.isTwo.filter(
              twoConfig => twoConfig !== configString
            );
            // remove possible value from isFive
            wireConfigs.isFive = wireConfigs.isFive.filter(
              twoConfig => twoConfig !== configString
            );

            // reset values
            // threeSegments = [];
            // sharedTwice = []
          }
        }
      }
    }

    // identify 9 config

    const fourSplit = wireConfigs.isFour.split("");
    for (let config of wireConfigs.isNine) {
      let nineSegments = config.split("");
      let sharesAll4 = true;

      for (let segment of fourSplit) {
        if (!nineSegments.includes(segment)) {
          sharesAll4 = false;
        }
      }
      if (sharesAll4) {
        // write isNine
        // let configString = "";
        // for (let segment of config) {
        //   configString = configString + segment;
        // }
        // wireConfigs.isNine = configString;
        wireConfigs.isNine = config;

        // remove possible value from isZero
        wireConfigs.isZero = wireConfigs.isZero.filter(
          // twoConfig => twoConfig !== configString
          zeroConfig => zeroConfig !== config
        );
        // remove possible value from isSix
        wireConfigs.isSix = wireConfigs.isSix.filter(
          // twoConfig => twoConfig !== configString
          sixConfig => sixConfig !== config
        );
      }
    }

    // identify 5 config

    const nineSplit = wireConfigs.isNine.split("");
    let sharesAll5 = true;

    for (let config of wireConfigs.isFive) {
      let fiveSplit = config.split("");
      for (let segment of fiveSplit) {
        // console.log("in isFive", segment, fiveSplit, nineSplit)
        if (!nineSplit.includes(segment)) {
          // console.log("triggered", segment)
          // sharesAll5 = false;
        }
        // else {console.log("found", segment)}
      }

      if (sharesAll5) {
        // console.log("in identify 5")
        wireConfigs.isFive = config;
        // console.log({config})
        // console.log(wireConfigs.isTwo)

        wireConfigs.isTwo = wireConfigs.isTwo.filter(
          // twoConfig => twoConfig !== configString
          twoConfig => twoConfig !== config
        );
        // console.log(wireConfigs.isTwo);

        wireConfigs.isTwo = wireConfigs.isTwo[0];
        // console.log(wireConfigs.isTwo);
          sharesAll5 = false;

      }
    }

    // identify 0 config (has both of 1 segments)

    const oneSegments = wireConfigs.isOne.split("");

    for (let config of wireConfigs.isZero) {
      let sharesAll1 = true;
      let zeroSegments = config.split("");

      for (let segment of oneSegments) {
        if (!zeroSegments.includes(segment)) {
          sharesAll1 = false;
        }
      }

      if (sharesAll1) {
        wireConfigs.isZero = config;

        wireConfigs.isSix = wireConfigs.isSix.filter(
          // twoConfig => twoConfig !== configString
          sixConfig => sixConfig !== config
        );
        wireConfigs.isSix = wireConfigs.isSix[0];
      }

      // all output nums (strings) should now be identified in wireConfigs object

      // const outputLookup = {
      //   `${wireConfigs.isZero}`: 0,

      // }

      // display["outputNums"] = processOutputs(display.outputs)
    }
    const outputLookup = Object.values(wireConfigs);
    // console.log({ outputLookup });
    // outputs may feature same letters in different order
    // break down to check

    let outputLetters = [];
    // let lookupLetters = [];
    // let allOutputNums = []

    for (let numSegment of display.outputs) {
      let letters = numSegment.split("");
      outputLetters.push(letters);
    }

    // for (let numSegment of outputLookup) {
    //   let letters = numSegment.split("");
    //   lookupLetters.push(letters);
    // }

    // console.log({ outputLetters });
    // console.log({ lookupLetters });

    let fullOutputNum = "";

    for (let output of outputLetters) {
      if (output.length === wireConfigs.isZero.length) {
        let zeroSplit = wireConfigs.isZero.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!zeroSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 0;
          // console.log("number is zero");
        }
      }

      if (output.length === wireConfigs.isOne.length) {
        let oneSplit = wireConfigs.isOne.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!oneSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 1;
          // console.log("number is one");
        }
      }

      if (output.length === wireConfigs.isTwo.length) {
        // console.log (wireConfigs.isTwo)
        // console.log(wireConfigs)
        let twoSplit = wireConfigs.isTwo.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!twoSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 2;
          // console.log("number is two");
        }
      }

      if (output.length === wireConfigs.isThree.length) {
        let threeSplit = wireConfigs.isThree.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!threeSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 3;
          // console.log("number is three");
        }
      }

      if (output.length === wireConfigs.isFour.length) {
        let fourSplit = wireConfigs.isFour.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!fourSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 4;
          // console.log("number is four");
        }
      }

      if (output.length === wireConfigs.isFive.length) {
        let fiveSplit = wireConfigs.isFive.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!fiveSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 5;
          // console.log("number is five");
        }
      }

      if (output.length === wireConfigs.isSix.length) {
        let sixSplit = wireConfigs.isSix.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!sixSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 6;
          // console.log("number is six");
        }
      }

      if (output.length === wireConfigs.isSeven.length) {
        let sevenSplit = wireConfigs.isSeven.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!sevenSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 7;
          // console.log("number is seven");
        }
      }

      if (output.length === wireConfigs.isEight.length) {
        let eightSplit = wireConfigs.isEight.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!eightSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 8;
          // console.log("number is eight");
        }
      }

      if (output.length === wireConfigs.isNine.length) {
        let nineSplit = wireConfigs.isNine.split("");

        let hasAll = true;
        for (let letter of output) {
          if (!nineSplit.includes(letter)) {
            hasAll = false;
          }
        }

        if (hasAll) {
          fullOutputNum = fullOutputNum + 9;
          // console.log("number is nine");
        }
      }

    }

    // console.log({fullOutputNum})
    allOutputNums.push(fullOutputNum)

    // for (let wrapper of lookupLetters ) {

    // for (let lookup of outputLetters){
    //   console.log("\n")
    //   let hasAll = true
    //   for (let letter of lookup){
    //     console.log(letter, lookup, wrapper)

    //     if(!wrapper.includes(letter)){
    //       hasAll = false
    //     }

    //     if (hasAll && (lookup.length === wrapper.length)){
    //     console.log("holy hell", lookupLetters.indexOf(wrapper))
    //     hasAll = false
    //   }

    //   // for (let displayNum of lookupLetters){
    //   //   // console.log(letter, displayNum)
    //   //   if(!displayNum.includes(letter)){
    //   //     hasAll = false
    //   //   }
    //   // }

    //   // if (hasAll){
    //   //   console.log("holy hell", lookupLetters.indexOf(displayNum))
    //   // }

    //   // if(lookupLetters.includes(letter)){
    //   //   console.log(outputLetters.indexOf(lookup))
    //   // }
    //   }

    // }
    // }

    // let outputNum = ""
    // for (let number of display.outputs){
    //   console.log(number)
    //   let outputDigit = outputLookup.indexOf(number)
    //   outputNum = outputNum + outputDigit
    // }

    // console.log(outputNum)

    // console.log(display)
  }
};
findUniqueDigits(displayArr);
// console.log(displayArr[0]);
console.log({allOutputNums})

let total = 0

for (let num of allOutputNums) {
  total = total + Number(num)
}
console.log({total})
// console.log(allOutputNums.length, splitTest.length)
console.log(allOutputNums.length, splitInput.length);


console.log(120 + Number('0'))

// not 995530 (too high)
// need way to check numbers are output correctly? (all correct for example...)
// double / repeated numbers the problem?

const digitDiscoverer = displayArr => {
  // const sevenSeg = {
  //   top: null,
  //   topL: null,
  //   topR: null,
  //   mid: null,
  //   botL: null,
  //   botR: null,
  //   bot: null
  // };
  // const
};

// sevenSeg displays for each digit =
// zeroDisplay = top, topL, topR, botL, botR, bot
// oneDisplay = topR, botR
// twoDisplay = top, topR, mid, botL, bot
// threeDisplay = top, topR, mid, botR, bot;
// fourDisplay = top, mid, botR, bot
// fiveDisplay = top, topL, mid, botR, bot
// sixDisplay = top, topL, mid, botL, botR, bot
// sevenDisplay = top, topR, botR
// eightDisplay = top, topL, topR, mid, botL, botR, bot
// nineDisplay = top, topL, topR, mid, botR, bot
