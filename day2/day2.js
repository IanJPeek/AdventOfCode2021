const {input, test} = require("./input")
let { sampler, totaller } = require("../helpers/helpers");

const splitTest = test.split("\n")
const splitInput = input.split("\n")

let direction
let distance
let commandArr = []

const inputSeparator = (inputArr) => {
  for(let command of inputArr){
    [direction, distance] = command.split(" ")
    commandArr.push([direction, Number(distance)])
  }
}
inputSeparator(splitInput)

let horizontalDist = 0
let depth = 0
let aim = 0

const distCalc = (commandArr) => {
  for (let command of commandArr){
    [direction, distance] = command
    if (direction === "forward"){
      horizontalDist += distance
      const aimProduct = aim * distance
      depth += aimProduct
    }
    if (direction === "down") {
      aim += distance;
    }
    if (direction === "up") {
      aim -= distance;
    }
  }
}
distCalc(commandArr)

const product = horizontalDist * depth
console.log("product is", product)
// pt 1 - 1604850
// pt 2 (distCalc modified) - 1685186100

