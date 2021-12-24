const { input, test } = require("./input");
let { totaller, coordinator } = require("../helpers/helpers");
let splitTest = test.split("\n");
let splitInput = input.split("\n");
// console.log("starting", { splitTest });

const inputParser = (splitArr) => {
  let lineNums = []
  for (let line of splitArr){
    let nums = line.split("")
    nums = nums.map(Number)
    lineNums.push(nums)
  }
  return lineNums
}
splitTest = inputParser(splitTest)
splitInput = inputParser(splitInput);
// console.log(splitTest)
let gridmap = coordinator(splitTest);
console.log("gridmap from helper:", coordinator(splitTest))

const findNeighbours = (arr2D) => {

  // let gridmap = {} // {'x,y': value}
  // let gridmap = coordinator (arr2D)

  let neighbours = {} //{'x,y': {value, left, right, above, below}


  // make gridmap -  {'x,y': value}
  for (let row in arr2D){
    for (let column in arr2D[row]){
      let position = [column,row]
      // let position = `(${column},${row})`;

      gridmap[position] = arr2D[row][column]  // lookup relies on indexes
    }
  }
  console.log("gridmap in function", gridmap)

  // make neighbours - {x,y} gives object with value of coords + all neighbours
  for(let coords in gridmap){ // eg coords = '0,2' (object keys)
    // console.log({coords})
    // console.log(coords.split(","))
    // console.log(coords.slice(1,-1))
    // let xyVals = coords.slice(1, -1);
    // console.log(xyVals)

    neighbours[coords] = {value: gridmap[coords]}
    // neighbours[coords] = { value: gridmap[`(${coords})`] };

    // neighbours[`(${coords})`] = { value: gridmap[coords] };

    allneighbours = []
    let [x,y] = coords.split(",")
    // let [x, y] = xyVals.split(",");


    if (gridmap[`${(x - 1).toString()},${y}`] !== undefined) {
      neighbours[coords]["left"] = gridmap[`${(x - 1).toString()},${y}`];
      // neighbours[`(${coords})`]["left"] = gridmap[`${(x - 1).toString()},${y}`];
      allneighbours.push(neighbours[coords]["left"]);
    }
    if (gridmap[`${(Number(x) + 1).toString()},${y}`] !== undefined) {
      neighbours[coords]["right"] =
        gridmap[`${(Number(x) + 1).toString()},${y}`];
      // neighbours[`(${coords})`]["right"] =
      //   gridmap[`${(Number(x) + 1).toString()},${y}`];
      allneighbours.push(neighbours[coords]["right"]);
    }
    if (gridmap[`${x},${(y - 1).toString()}`] !== undefined) {
      neighbours[coords]["above"] = gridmap[`${x},${(y - 1).toString()}`];
      //  neighbours[`(${coords})`]["above"] =
      //    gridmap[`${x},${(y - 1).toString()}`];
      allneighbours.push(neighbours[coords]["above"]);
    }
    if (gridmap[`${x},${(Number(y) + 1).toString()}`] !== undefined) {
      neighbours[coords]["below"] =
        gridmap[`${x},${(Number(y) + 1).toString()}`];
      // neighbours[`(${coords})`]["below"] =
      //   gridmap[`${x},${(Number(y) + 1).toString()}`];
      allneighbours.push(neighbours[coords]["below"]);
    }
    neighbours[coords]["allneighbours"] = allneighbours;
    // neighbours[`(${coords})`]["allneighbours"] = allneighbours;
  }
  return neighbours
}
// let neighbours = findNeighbours(splitInput)
let neighbours = findNeighbours(splitTest);

// console.log({gridmap});
console.log("neighbours", neighbours);

const riskIdentifier = (neighbours) => {
  let allRisks = []
  for( let coord in neighbours){
    let coordData = neighbours[coord];
    let {value, allneighbours} = coordData

    let allLess = true
    for (let neighbour of allneighbours){
      if (value >= neighbour){
        allLess = false
      }
    }

    if (allLess){
      // console.log(`Risk identified for ${coord}: ${value}, adding risk ${Number(value) + 1} to allRisks`)
      allRisks.push(Number(value) + 1);
    }
  }
  return allRisks
}
const allRisks = riskIdentifier(neighbours)
// console.log({allRisks})
// console.log(totaller(allRisks))
// pt. 1 = 478

// modifiy "risks for get lowPoints"
const lowPointIdentifier = neighbours => {
  let lowPoints = [];
  for (let coord in neighbours) {
    let coordData = neighbours[coord];
    let { value, allneighbours } = coordData;

    let allLess = true;
    for (let neighbour of allneighbours) {
      if (value >= neighbour) {
        allLess = false;
      }
    }

    if (allLess) {
      // console.log(`lowPoint:`, coord)
      lowPoints.push(coord);
    }
  }
  return lowPoints;
};
let lowPoints = lowPointIdentifier(neighbours)
// console.log(lowPoints)
// console.log("gridmap:", gridmap)

const printMap = (gridmap) => {
  const mapLines = []
  for(let row of gridmap){
    let rowString = ""
    for (let value of row){
      if (value!==9){
      rowString = rowString + value
      }
      else {rowString = rowString + "-"}
    }
    mapLines.push([rowString])
    // console.log(rowString)  // prints map if uncommented
  }
  return mapLines
}
const mapPrint = printMap(splitTest)
// console.log({mapPrint})



// repeat - identify all neighbours, scrub low (current) values
// each lowPoint forms it's own basin

