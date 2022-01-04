const { input, test } = require("./input");
let { totaller, coordinator } = require("../helpers/helpers");
let splitTest = test.split("\n");
let splitInput = input.split("\n");
// console.log("starting", { splitTest });

/**
 * Convert inputArr to 2D nums arr
 * @param {string[]} splitArr - numStrings ["234", "567", "10003"]
 * @returns {[number][]} 2D nums arr [ [2,3,4], [5,6,7], [1,0,0,0,3] ]
 */
const inputParser = splitArr => {
  let lineNums = [];
  for (let line of splitArr) {
    let nums = line.split("");
    nums = nums.map(Number);
    lineNums.push(nums);
  }
  return lineNums;
};
splitTest = inputParser(splitTest);
splitInput = inputParser(splitInput);
// console.log(splitTest)

let gridmap = coordinator(splitInput); // returns lookup object with value at each (x,y) co-ord:
// {(0,0) : 2, (1,0) : 3, (2,0) : 4, (0,1) : 5, (0,2) : 6 }
// console.log("gridmap from helper:", coordinator(splitTest))

/**
 * Creates lookup obj with co-ordinate value + all (orthogonal) neighbour values
 * @param {[number][]} arr2D 2D nums arr [ [2,3,4], [5,6,7], [1,0,0,0,3] ]
 * @returns {{"(0,1)" : {value: number, left: number, right: number, above: number, below: number, allNeighbours: number[]} }} { (0,1) : {value: 6, left: 5, right: 7, above: 3, below: 0, allNeighbours : [5,7,3,0]} }
 */
const findNeighbours = arr2D => {
  let neighbours = {}; //{ (x,y): {value, left, right, above, below, allNeighbours[5,7,3,0]}

  for (let coords in gridmap) {
    // make neighbours - { (x,y) : {} }
    // => populates object with value @coords + values of all (orthogonal) neighbours

    neighbours[coords] = { value: gridmap[coords] }; // {(0,1) : {value: 3}}
    allNeighbours = []; // holds values of orthogonal neighbours {(0,1) : [5,7,3,0]}
    neighbourCoords = [];

    let [x, y] = coords.split(","); // ["(0" , "1)"]
    x = x.slice(1); // take number after "(" bracket
    y = y.slice(0, -1); // take number before ")" bracket

    // find values of orthongal neighbours, populate values of allNeighbours
    if (gridmap[`(${(x - 1).toString()},${y})`] !== undefined) {
      // populate value for 'left' (+ allNeigh[])
      neighbours[coords]["left"] = gridmap[`(${(x - 1).toString()},${y})`];
      neighbourCoords.push(`(${(x - 1).toString()},${y})`);
      allNeighbours.push(neighbours[coords]["left"]);
    }

    if (gridmap[`(${(Number(x) + 1).toString()},${y})`] !== undefined) {
      // populate 'right' (+ allNeigh[])
      neighbours[coords]["right"] =
        gridmap[`(${(Number(x) + 1).toString()},${y})`];
      neighbourCoords.push(`(${(Number(x) + 1).toString()},${y})`);
      allNeighbours.push(neighbours[coords]["right"]);
    }

    if (gridmap[`(${x},${(y - 1).toString()})`] !== undefined) {
      // populate 'above' (+ allNeigh[])
      neighbours[coords]["above"] = gridmap[`(${x},${(y - 1).toString()})`];
      neighbourCoords.push(`(${x},${(y - 1).toString()})`);
      allNeighbours.push(neighbours[coords]["above"]); //
    }

    if (gridmap[`(${x},${(Number(y) + 1).toString()})`] !== undefined) {
      // populate 'below' (+ allNeigh[])
      neighbours[coords]["below"] =
        gridmap[`(${x},${(Number(y) + 1).toString()})`];
      neighbourCoords.push(`(${x},${(Number(y) + 1).toString()})`);
      allNeighbours.push(neighbours[coords]["below"]);
    }
    neighbours[coords]["allNeighbours"] = allNeighbours; // add populated "allNeighbours" key/ value
    neighbours[coords]["neighbourCoords"] = neighbourCoords;
  }
  return neighbours;
};
// let neighbours = findNeighbours(splitInput)
let neighbours = findNeighbours(splitTest);
// console.log("neighbours", neighbours);

/**
 * identifies lowPoints + assigns RISK values[] (RISK @co-ords where all neighbours are >= co-ord value)
 * @param {*} neighbours - Co-ord lookup (0,1) with {co-ord value + neighbouring values}
 */
const riskIdentifier = neighbours => {
  let allRisks = [];
  let lowPoints = [];
  for (let coord in neighbours) {
    let coordData = neighbours[coord];
    let { value, allNeighbours } = coordData;

    let allLess = true;
    for (let neighbour of allNeighbours) {
      if (value >= neighbour) {
        allLess = false;
      }
    }

    if (allLess) {
      // console.log(`Risk identified for ${coord}: ${value}, adding risk ${Number(value) + 1} to allRisks`)
      allRisks.push(Number(value) + 1);
      lowPoints.push(coord);
    }
  }
  return [allRisks, lowPoints];
};
const [allRisks, lowPoints] = riskIdentifier(neighbours);
console.log({ lowPoints });
console.log({ allRisks });
console.log("total risk of lowpoints:", totaller(allRisks));
// pt. 1 = 478

// helper function to display map
const printMap = gridmap => {
  const mapLines = [];
  for (let row of gridmap) {
    let rowString = "";
    for (let value of row) {
      if (value !== 9) {
        rowString = rowString + value;
      } else {
        rowString = rowString + "-";
      }
    }
    mapLines.push([rowString]);
    // console.log(rowString)  // prints map if uncommented
  }
  return mapLines;
};
const mapPrint = printMap(splitTest);
// console.log({ mapPrint });


// Pt 2

// finds next neighbours, based on neighbours of current basinPoint, updates basin with values from current (recursive) step
const expandBasin = (newNeighbours, basin) => {
  let nextNeighbours = [];
  for (let coord of newNeighbours) {
    let newNeighbourCoords = neighbours[coord]["neighbourCoords"];

    for (let coord of newNeighbourCoords) {
      if (neighbours[coord]["value"] !== 9) {
        if (!basin.includes(coord)) {
          basin.push(coord);
          nextNeighbours.push(coord);
        }
      }
    }
  }
  return nextNeighbours
};

const findBasinSize = (lowPoint) => {
  let basin = [lowPoint]; // array of co-ords forming basin []
  let newNeighbours = [];

  let neighbourCoords = neighbours[lowPoint]["neighbourCoords"];

  for (let coord of neighbourCoords) {
    if (neighbours[coord]["value"] !== 9) {
      basin.push(coord);
      newNeighbours.push(coord); // next values to check for expansion
    }
  }

  // recursive step ...
  while (newNeighbours.length > 0) {
    newNeighbours = expandBasin(newNeighbours, basin)
  }

  return basin.length
};


const findAllBasonSizes = (lowPoints) => {
  const basinSizes = []

  for (let low of lowPoints){
    basinSizes.push(findBasinSize(low))
  }
  return basinSizes
}
const basinSizes = findAllBasonSizes(lowPoints)

basinSizes.sort(function(a, b) {
  return b - a;
});
console.log({ basinSizes });

const maxThreeProduct = basinSizes[0] * basinSizes[1] * basinSizes[2];
console.log({maxThreeProduct});

// pt 2 answer: 1327014
