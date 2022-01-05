const { input, test, testBig } = require("./input");
let {
  totaller,
  coordinator,
  printMap,
  findNeighbours
} = require("../helpers/helpers");
let splitTest = test.split("\n");
let splitBig = testBig.split("\n");
let splitInput = input.split("\n");
// console.log("start", {splitTest})

const inputParser = input => {
  const allOctopodes = [];
  for (let line of input) {
    let octopodes = line.split("");
    octopodes = octopodes.map(Number);
    allOctopodes.push(octopodes);
  }
  return allOctopodes;
};
// splitTest = inputParser(splitTest)
// splitBig = inputParser(splitBig);
splitInput = inputParser(splitInput);

/**
 * increases all numbers in a 2D arr (default increase = 1)
 * @param {[number][]} input parsed 2D numString arr
 * @param {number} increaseVal value for increase
 */
const basicIncrease = (input, increaseVal = 1) => {
  // STEP 1 - increases ALL octo energy levels by 1
  let allIncreased = [];
  for (let row of input) {
    let increasedRow = [];
    for (let octopus of row) {
      octopus = octopus + increaseVal;
      increasedRow.push(octopus);
    }
    allIncreased.push(increasedRow);
  }
  return allIncreased;
};
let increased = basicIncrease(splitInput);               // returns array w/ all values increased by 1

let grid = coordinator(increased);                       // inits grid with increased (+1) values
let neighbours = findNeighbours(increased, false);       // inits 'detailed' version of grid (from 2d arr)
// console.log("\nafter STEP 1 - basic increase"), printMap(increased);
let totalFlashes = 0;

const octoFlash = neighbours => {
  let flashCount = 0;
  let flashedGrid = { ...grid }; 
  let flashAgain = false;

  for (let coord in neighbours) {
    neighbours[coord]["hasFlashed"] = false; // add hasFlashed key to all {neighbours} (on first pass)

    // handle Octos (on 1st Flash): 
    //  1) flashAgain (for all) + hasFlashed (for coord) = true
    //  2) increment flashCount
    //  3) increment neighbours ({flashedGrid})
    if (neighbours[coord]["value"] > 9) {

      flashAgain = true;                           // one flash may mean more are needed...
      neighbours[coord]["hasFlashed"] = true;      // set hasFlashed to true for co-ord (so !recount !reFlash)
      flashCount = flashCount + 1;                 // increment flashcount for this STEP

      // increase value of neighbours
      for (let neighbour of neighbours[coord]["neighbourCoords"]) {
        flashedGrid[neighbour] = flashedGrid[neighbour] + 1;
      }
    }
  }

  // flashAgain, if needed (runs in case of any previous flashes)
  while (flashAgain) {
    let ceaseFlash = true;

    for (let updatedCoord in flashedGrid) {
      if (
        flashedGrid[updatedCoord] > 9 &&
        !neighbours[updatedCoord]["hasFlashed"]    // ignores previous flashes for this STEP
      ) {
        ceaseFlash = false;
        neighbours[updatedCoord]["hasFlashed"] = true;
        flashCount = flashCount + 1;

        // increase value of neighbours
        for (let neighbour of neighbours[updatedCoord]["neighbourCoords"]) {
          flashedGrid[neighbour] = flashedGrid[neighbour] + 1;
        }
      }
    }

    if (ceaseFlash) {
      flashAgain = false;
    }
  }

  // reset flashed values to 0
  for (let coord in flashedGrid) {
    if (flashedGrid[coord] > 9) {
      flashedGrid[coord] = 0;
    }
  }

  totalFlashes = totalFlashes + flashCount;
  return flashedGrid;
};
let flashedGrid = octoFlash(neighbours);

// reset neighbours based on new flashedGrid
neighbours = flashedGrid;

const convertGridTo2dArr = grid => {
  let gridArr = [];
  let gridRow = [];
  let currentRow = 0;

  for (let coord in grid) {
    let [x, y] = coord.split(","); // ["(0" , "1)"]
    x = x.slice(1); // take number after "(" bracket
    y = y.slice(0, -1); // take number before ")" bracket

    if (y > currentRow) {
      gridArr.push(gridRow);
      currentRow = currentRow + 1;
      gridRow = [];
    }
    gridRow.push(grid[coord]);
  }
  gridArr.push(gridRow);

  return gridArr;
};
let arrFromGrid = convertGridTo2dArr(flashedGrid);


let stepNum = 2;
const runSteps = (maxSteps=4) => {
  while (stepNum < maxSteps+1) {
    increased = basicIncrease(arrFromGrid);
    // console.log(`\n after STEP ${stepNum} - basic increase`);
    // printMap(increased);

    neighbours = findNeighbours(increased, false);
    grid = coordinator(increased);
    flashedGrid = octoFlash(neighbours);
    arrFromGrid = convertGridTo2dArr(flashedGrid);
    console.log(`\n after STEP ${stepNum} - flash`); // (shouldn't change?)
    // printMap(arrFromGrid);
    console.log("updated flashTotal", { totalFlashes });
    stepNum = stepNum + 1;
  }
};
runSteps(100)

// pt. 1 ANS = 1719

