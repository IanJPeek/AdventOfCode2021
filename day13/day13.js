const { input, test } = require("./input");
let { totaller, coordinator, printMap } = require("../helpers/helpers");
let splitTest = test.split("\n");
let splitInput = input.split("\n");
// console.log({splitTest})

let testInstructions = splitTest.slice(-2)
let testPaper = splitTest.slice(0,-3)
// testPaper = testPaper.map(coord =>)
let inputInstructions = splitInput.slice(-12);
let inputPaper = splitInput.slice(0, -13);
// console.log({testPaper})
console.log({testInstructions})
// console.log({ inputInstructions });
// console.log( inputPaper[inputPaper.length-1]);

const extractInstructions = (instructionsArr) => {

  let trimmedInstructions = []


  for (let instruction of instructionsArr) {
    let shortInstruction = instruction.split(" ")
    trimmedInstructions.push(shortInstruction[2])
  }
  return trimmedInstructions
  
}
let trimmedInstructions = extractInstructions(testInstructions)
console.log(trimmedInstructions)

const displayRows = (rowArr) => {
   for (let row of rowArr){
      let rowString = ""
      for (let gridValue of row){
        rowString = rowString + gridValue
      }
      console.log(rowString)  // comment/ uncomment for display of grid
      rowString = ""
    }
}

const plotCoords = (coordArr, plotChar="#") => {

  // separate x/y vals, find maximum of each to determine gridSize (eg 10(x) x 14(y))
  let xVals = []
  let yVals = []
  coordArr.forEach(coord => {
    let coordPair
    coordPair = coord.split(",")
    let [x,y] = coordPair
    xVals.push(x)
    yVals.push(y)
  })
  // console.log({xVals})
  // console.log({ yVals });

  let xMax = Math.max(...xVals)
  let yMax = Math.max(...yVals)
  // console.log({xMax})
  // console.log({ yMax });

  // make grid of coOrds (obj) up to maxSize

  let grid = {}  // {(3,7): "."}
  let emptyChar = "."

  // make empty grid
  for (xCoord=0;xCoord<xMax+1;xCoord++){
    for (yCoord = 0; yCoord < yMax+1; yCoord++) {
      grid[`(${xCoord},${yCoord})`] = emptyChar;
    }
  }
  // console.log(grid)

  // assign plotChars to coords of grid 
  for (let coords of coordArr){
    grid[`(${coords})`] = plotChar
  }
  // console.log("updated", grid)

  // make array of empty arrays (need no. of rows equal to height (yMax))
  let allRows = [] 
  for (let i=0;i<yMax+1; i++){
    allRows.push([])
  }
  
  let counter = 0
  // loops through columns, adding leftmost value for each row 
  for (let coord in grid){

    // resets loop, once all rows have values added
    if(counter === yMax + 1) {
      counter = 0
    }
    
    allRows[counter].push(grid[coord])
    counter = counter + 1;
  }
  // console.log(allRows)

  // display 2dArr (grid)
  // displayRows(allRows)

    // for (let row of allRows){
    //   let rowString = ""
    //   for (let gridValue of row){
    //     rowString = rowString + gridValue
    //   }
    //   console.log(rowString)  // comment/ uncomment for display of grid
    //   rowString = ""
    // }

    return [allRows, grid]
}
let [allRows, grid] = plotCoords(testPaper)

const followFoldInstruction = (foldInstruction) => {

  if (foldInstruction[0] === "y"){

    // replace row with "-" for display
    let rowToReplace = allRows[foldInstruction.slice(2)]
    // console.log(rowToReplace)
    let replacementRow = []

    for (let char of rowToReplace){
      replacementRow.push("-")
    }
    // console.log(replacementRow)
    allRows[foldInstruction.slice(2)] = replacementRow
  }

  if (foldInstruction[0] === "x"){

    for (let row of allRows){
      // row[foldInstruction[2]] = "|"
      row[foldInstruction[2].s] = "|";

    }

  }

}
followFoldInstruction(trimmedInstructions[0])

// console.log(allRows)
displayRows(allRows)