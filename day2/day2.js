const {input, test} = require("./input")
let { sampler, totaller } = require("../helpers/helpers");

const splitTest = test.split("\n").map(num => Number(num))
const splitInput = input.split("\n").map(num => Number(num));

console.log("starting input", splitTest)