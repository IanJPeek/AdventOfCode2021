const { input, test } = require("./input");

const splitTest = test.split("\n");
const splitInput = input.split("\n");
const testDigits = splitTest.map(binary => binary.split(""))
const inputDigits = splitInput.map(binary => binary.split(""));

const digitCounter = (inputArr) => {
  const digitCountAtPosition = {}

  for (let digitArr of inputArr) {
    for (let digit in digitArr) {
      const index = Number(digit)
      digit = digitArr[index]

      // 1st time only - assign count object for each index/ bit/ position
      if (!digitCountAtPosition[index]){
        let zeroCount = 0;
        let oneCount = 0;
        const positionCount = {
          zeroCount: zeroCount,
          oneCount: oneCount
        };
        digitCountAtPosition[index] = positionCount
      }

      // assign count value by object lookup
      zeroCount = digitCountAtPosition[index].zeroCount
      oneCount = digitCountAtPosition[index].oneCount;

      // increment count according to digit value (0 or 1)
      digit === "0" ? zeroCount++ : oneCount++;
      
      // modify lookup object value
      digitCountAtPosition[index].zeroCount = zeroCount;
      digitCountAtPosition[index].oneCount = oneCount;
    }
  }
  return digitCountAtPosition
}
const digitCountAtPosition = digitCounter(inputDigits)

const assignGamma = (digitCountObj) => {
  let gammaString = ""
  let epsilonString = ""
  
  for (let position in digitCountObj) {
    countAtPosition = digitCountObj[position]
    countAtPosition.zeroCount > countAtPosition.oneCount ? (gammaString = gammaString + "0", epsilonString = epsilonString + "1") : (gammaString = gammaString + "1", epsilonString = epsilonString + "0")
  }
  return [gammaString, epsilonString]
}
const [gamma, epsilon] = assignGamma(digitCountAtPosition);
const gammaDecimal = parseInt(gamma, 2);
const epsilonDecimal = parseInt(epsilon, 2);
const product = gammaDecimal * epsilonDecimal

console.log("digitCount", digitCountAtPosition);
console.log("gamma", gamma, "epsilon", epsilon);
console.log("decimal gamma", gammaDecimal, "decimal epsilon", epsilonDecimal);
console.log("product", product);  // pt. 1 = 852500

const assignOxygen = (digitCountObj, splitTest) => {
  let filterArray = [...splitTest]

  for (let position in digitCountObj) {
    if (filterArray.length !== 1){       // (apply logic unless array only has one value)

    countAtPosition = digitCountObj[position]     // get 0/1 countObject

    // if ones are more (or equal to) zeros, keep nums with "1" at that index /position
    countAtPosition.oneCount >= countAtPosition.zeroCount
      ? (filterArray = filterArray.filter(binary =>
          binary.startsWith("1", position)
        ))
    // if ones are less than zeros, keep nums with "0" at that index /position
      : (filterArray = filterArray.filter(binary =>
          binary.startsWith("0", position)
        ));
      }

    // re-count digits according to new (filtered) array
    digitCountObj = digitCounter(filterArray)
  }

  return filterArray[0]
}
const O2string = assignOxygen(digitCountAtPosition, splitInput)

const assignCO2 = (digitCountObj, splitTest) => {
  let filterArray = [...splitTest];

  for (let position in digitCountObj) {
    if (filterArray.length !== 1){ // (apply logic unless array only has one value)

    countAtPosition = digitCountObj[position];  // get 0/1 countObject

    // if zeros are less than (or equal to) ones, keep nums with "0" at that index /position
    countAtPosition.zeroCount <= countAtPosition.oneCount
      ? (filterArray = filterArray.filter(binary =>
          binary.startsWith("0", position)
        ))
    // if ones are more than zeros, keep nums with "1" at that index /position
      : (filterArray = filterArray.filter(binary =>
          binary.startsWith("1", position)
        ));
      }
    
    // re-count digits according to new (filtered) array
    digitCountObj = digitCounter(filterArray);    
    }
    return filterArray[0];
};
const CO2string = assignCO2(digitCountAtPosition, splitInput);

const O2Decimal = parseInt(O2string, 2);
const CO2Decimal = parseInt(CO2string, 2);
const gasProduct = O2Decimal * CO2Decimal

console.log("\nO2:", O2Decimal, "CO2:", CO2Decimal);
console.log("gasProduct", gasProduct) // pt.2 = 1007985
