const { input, test } = require("./input");
let { totaller, coordinator, printMap } = require("../helpers/helpers");
let splitTest = test.split("\n");
// splitTest = splitTest.map(Number)
let splitInput = input.split("\n");
console.log({splitTest})

// const coordinator = array2D => {
//   let coords = {};
//   for (let rowNum in array2D) {
//     const row = array2D[rowNum];
//     for (let column in row) {
//       coords[`(${column},${rowNum})`] = Number(array2D[rowNum][column]);
//     }
//   }
//   return coords;
// };

// PSEUDO

// 1) make a co-ord grid + populate
// 2) design a function that takes a co-ord, + finds values of orthogonal neighbours
// 3) choose lowest value as next position, (save/ push values)
// ... *Prob* - Will encounter multiple choice for lowest value
// ... *Prob2* - Lowest TOTAL may require higher numbers in path to reach lower numbers 
// (Lowest neighbour is not necessarily best choice/ part of solution - lowest total path) => Re-think!

// PLAN B
// 1) find values of all possible paths through grid 
// 2) ... need to determine all possible paths (Co-ords of each position) to get values on path, then total
// ** Move from TL towards BR <=> (+1, / +1) <=> Increase xVal, or increase yVal (increased yVal moves DOWN)

//  ** find helper function that makes grid... - cleanup/ extract

let grid = coordinator(splitTest, true);
console.log(grid);
printMap(splitTest)