const { input, test } = require("./input");
let { totaller } = require("../helpers/helpers");

let splitTest = test.split("\n");
let splitInput = input.split("\n");
splitTest = splitTest.map(lineEnds => lineEnds.split(" -> "));
splitInput = splitInput.map(lineEnds => lineEnds.split(" -> "));
// console.log("test", splitTest)

const extractLines = endPairs => {
  const horVertLines = [];
  const diagPoints = [];
  const slopes = [];
  const coordsCount = {};

  for (let endPair of endPairs) {
    let xy1 = endPair[0];
    let xy2 = endPair[1];
    // console.log({xy1, xy2})
    let [x1, y1] = xy1.split(",");
    let [x2, y2] = xy2.split(",");

    if (x1 === x2 || y1 === y2) {
      horVertLines.push(endPair);

      // add vertical lines
      if (x1 === x2) {
        // if xCoords are equal, add yCoords
        if (Number(y2) > Number(y1)) {
          // loop logic if 2nd y val is greater:
          for (let i = Number(y1); i < Number(y2) + 1; i++) {
            coordsCount[`${x1},${i}`]
              ? (coordsCount[`${x1},${i}`] = coordsCount[`${x1},${i}`] + 1)
              : (coordsCount[`${x1},${i}`] = 1);
          }
        } else {
          // loop logic if 1st y val is greater:
          for (let i = Number(y2); i < Number(y1) + 1; i++) {
            coordsCount[`${x1},${i}`]
              ? (coordsCount[`${x1},${i}`] = coordsCount[`${x1},${i}`] + 1)
              : (coordsCount[`${x1},${i}`] = 1);
          }
        }
      }

      // add horizontal lines
      if (y1 === y2) {
        // if xCoords are equal, add xCoords
        if (Number(x2) > Number(x1)) {
          // loop logic if 2nd x val is greater:
          for (let i = Number(x1); i < Number(x2) + 1; i++) {
            coordsCount[`${i},${y1}`]
              ? (coordsCount[`${i},${y1}`] = coordsCount[`${i},${y1}`] + 1)
              : (coordsCount[`${i},${y1}`] = 1);
          }
        } else {
          // loop logic if 1st x val is greater:
          for (let i = Number(x2); i < Number(x1) + 1; i++) {
            coordsCount[`${i},${y1}`]
              ? (coordsCount[`${i},${y1}`] = coordsCount[`${i},${y1}`] + 1)
              : (coordsCount[`${i},${y1}`] = 1);
          }
        }
      }
    } else {
      slopes.push(endPair);
    }
  }
  // console.log("started with", endPairs.length, "pairs")
  // console.log("ended with", horVertLines.length, "horizontal & vertical")

  // handle slopes/ diagonals
  for (let slope of slopes) {
    let xy1 = slope[0];
    let xy2 = slope[1];
    // console.log({xy1, xy2})
    let [x1, y1] = xy1.split(",");
    let [x2, y2] = xy2.split(",");
    let xDiff = Math.abs(x1 - x2);
    let yDiff = Math.abs(y1 - y2);

    if (xDiff === yDiff) {
      if (Number(y2) > Number(y1) && Number(x2) > Number(x1)) {
        // loop logic if 2nd y & x val is greater:
        // console.log("diagonal - both increase", slope); // x + y increase by 1

        let increment = 0;
        for (let i = Number(x1); i < Number(x2) + 1; i++) {
          let xStart = Number(x1);
          let yStart = Number(y1);

          diagPoints.push(`${xStart + increment},${yStart + increment}`);

          coordsCount[`${xStart + increment},${yStart + increment}`]
            ? (coordsCount[`${xStart + increment},${yStart + increment}`] =
                coordsCount[`${xStart + increment},${yStart + increment}`] + 1)
            : (coordsCount[`${xStart + increment},${yStart + increment}`] = 1);

          increment++;
        }
        // console.log("diagPoints, both increasing", diagPoints);
      }

      if (Number(y1) > Number(y2) && Number(x2) > Number(x1)) {
        // loop logic if x increase, y decrease:
        // console.log("diagonal - x increases, y decreases", slope); // x increase, y decrease

        let increment = 0;
        let decrement = 0;
        let localDiag = [];

        for (let i = Number(x1); i < Number(x2) + 1; i++) {
          let xStart = Number(x1);
          let yStart = Number(y1);

          // console.log("IN FOR LOOP")
          // console.log({xStart, yStart})

          localDiag.push(`${xStart + increment},${yStart - decrement}`);
          diagPoints.push(`${xStart + increment},${yStart - decrement}`);

          coordsCount[`${xStart + increment},${yStart - decrement}`]
            ? (coordsCount[`${xStart + increment},${yStart - decrement}`] =
                coordsCount[`${xStart + increment},${yStart - decrement}`] + 1)
            : (coordsCount[`${xStart + increment},${yStart - decrement}`] = 1);

          increment++;
          decrement++;
        }
        // console.log("diagPoints, x increasing", diagPoints);
        // console.log("localDiag", localDiag);
      }
    }

    if (Number(y1) < Number(y2) && Number(x2) < Number(x1)) {
      // loop logic if x decrease, y increase:
      // console.log("diagonal - x decreases, y increases", slope); // x decrease, y increase

      let increment = 0;
      let decrement = 0;
      let newDiag = [];

      // x decrease, y increase
      for (let i = Number(x2); i < Number(x1) + 1; i++) {
        let xStart = Number(x1);
        let yStart = Number(y1);

        //  console.log("IN FOR LOOP");
        //  console.log({ xStart, yStart });

        newDiag.push(`${xStart - increment},${yStart + decrement}`);
        diagPoints.push(`${xStart - increment},${yStart + decrement}`);

        coordsCount[`${xStart - increment},${yStart + decrement}`]
          ? (coordsCount[`${xStart - increment},${yStart + decrement}`] =
              coordsCount[`${xStart - increment},${yStart + decrement}`] + 1)
          : (coordsCount[`${xStart - increment},${yStart + decrement}`] = 1);

        increment++;
        decrement++;
      }
      // console.log("newDiag", newDiag);
    }

    if (Number(y2) < Number(y1) && Number(x2) < Number(x1)) {
      // loop logic if 2nd y & x val is greater:
      // console.log("diagonal - both decrease", slope); // x + y increase by 1

      let increment = 0;
      let lastDiag = []
      for (let i = Number(x2); i < Number(x1) + 1; i++) {
        let xStart = Number(x1);
        let yStart = Number(y1);
        // console.log("IN FOR LOOP")
        // console.log(xStart, yStart)

        diagPoints.push(`${xStart - increment},${yStart - increment}`);
        lastDiag.push(`${xStart - increment},${yStart - increment}`);

        coordsCount[`${xStart - increment},${yStart - increment}`]
          ? (coordsCount[`${xStart - increment},${yStart - increment}`] =
              coordsCount[`${xStart - increment},${yStart - increment}`] + 1)
          : (coordsCount[`${xStart - increment},${yStart - increment}`] = 1);

        increment++;
      }
      // console.log("diagPoints, both increasing", diagPoints);
      // console.log("lastDiag", lastDiag)
    }
  }

  const dangerPoints = [];
  for (let point in coordsCount) {
    // console.log({point})
    // console.log(coordsCount[point])
    if (coordsCount[point] > 1) {
      // console.log("DANGER!", point, coordsCount[point]);
      dangerPoints.push(point);
    }
  }

  // console.log(coordsCount)
  console.log("dangerPoints", dangerPoints, dangerPoints.length);
  return horVertLines;
};
const horVertLines = extractLines(splitInput); // pt.1 6666
// pt.2 19081
// console.log("horVertLines", horVertLines)
