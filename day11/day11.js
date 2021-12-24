const { input, test, testBig } = require("./input");
let { totaller, coordinator, printMap } = require("../helpers/helpers");
let splitTest = test.split("\n");
let splitBig = testBig.split("\n");
let splitInput = input.split("\n");

// console.log("start", {splitTest})

const inputParser = (input) => {
  const allOctopodes = []
  for (let line of input){
    let octopodes = line.split("")
    octopodes = octopodes.map(Number)
    allOctopodes.push(octopodes)
  }
  return allOctopodes
}
splitTest = inputParser(splitTest)
// printMap(splitTest)
console.log("parsed (2d num arr)", splitTest)

let grid = coordinator(splitTest)
console.log(grid)


const startIncrease = (input, increaseVal=1) => {
  let allIncreased = []
  for (let row of input){
    let increasedRow = []
    for (let octopus of row){
      octopus = octopus + increaseVal
      increasedRow.push(octopus)
    }
    allIncreased.push(increasedRow)
  }
return allIncreased
}
let increased = startIncrease(splitTest)
// console.log("increased", increased);
// printMap(increased)