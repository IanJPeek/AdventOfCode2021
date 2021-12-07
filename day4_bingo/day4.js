const { input, test } = require("./input");
let { totaller } = require("../helpers/helpers");

const splitTest = test.split("\n");
const splitInput = input.split("\n");

// separate each line into individual nums, push num to "unmarked" arr (collects all nums for board)
const lineParser = (line, unmarked) => {
  const lineNumbers = line.split(" ").filter(num => num !== "");
  lineNumbers.forEach(num => unmarked.push(num));
  return lineNumbers;
};

// 1) split input into a) bingoCalls + b) boardsArr
const inputParser = inputArr => {
  // i) parse bingoCalls
  const bingoCalls = inputArr.shift().split(",");
  inputArr.shift();

  // ii) make arr of bingoBoards from templates
  // define empty template + boardArr
  let boardArr = [];
  let bingoTemplate = {
    // for empty rows, fill when num called
    topMarked: [],
    midTopMarked: [],
    midMarked: [],
    midBotMarked: [],
    botMarked: [],
    // for empty columns, fill when num called
    leftMarked: [],
    midLeftMarked: [],
    midColMarked: [],
    midRightMarked: [],
    rightMarked: [],
    // all card nums,
    unmarked: []
  };
  let bingoBoard = JSON.parse(JSON.stringify(bingoTemplate)); // DEEP copy (not spread <=> ...)

  // populate bingoBoard using rows/ lines
  // bingoBoard tracks marked rows + cols (updates add nums), + unmarked nums (updates remove nums)
  for (let lineNum in inputArr) {
    const remainder = (Number(lineNum) % 6).toString();
    switch (remainder) {
      // case 0-4, update rows
      // case 5, push board + reset template
      case "0":
        bingoBoard["top"] = lineParser(inputArr[lineNum], bingoBoard.unmarked);
        break;
      case "1":
        bingoBoard["midTop"] = lineParser(
          inputArr[lineNum],
          bingoBoard.unmarked
        );
        break;
      case "2":
        bingoBoard["mid"] = lineParser(inputArr[lineNum], bingoBoard.unmarked);
        break;
      case "3":
        bingoBoard["midBot"] = lineParser(
          inputArr[lineNum],
          bingoBoard.unmarked
        );
        break;
      case "4":
        bingoBoard["bot"] = lineParser(inputArr[lineNum], bingoBoard.unmarked);
        break;
      case "5":
        boardArr.push(bingoBoard);
        bingoBoard = JSON.parse(JSON.stringify(bingoTemplate));
        break;
    }
  }
  boardArr.push(bingoBoard);
  return [bingoCalls, boardArr];
};
let [bingoCalls, boardArr] = inputParser(splitInput);
// console.log({ bingoCalls }, boardArr);

// 2) update all bingoBoards with called number
const updateBoards = callNum => {
  for (let board of boardArr) {
    let index;
    // update row + find index (for col update)
    board.top.includes(callNum)
      ? (board.topMarked.push(callNum), (index = board.top.indexOf(callNum)))
      : null;
    board.midTop.includes(callNum)
      ? (board.midTopMarked.push(callNum),
        (index = board.midTop.indexOf(callNum)))
      : null;
    board.mid.includes(callNum)
      ? (board.midMarked.push(callNum), (index = board.mid.indexOf(callNum)))
      : null;
    board.midBot.includes(callNum)
      ? (board.midBotMarked.push(callNum),
        (index = board.midBot.indexOf(callNum)))
      : null;
    board.bot.includes(callNum)
      ? (board.botMarked.push(callNum), (index = board.bot.indexOf(callNum)))
      : null;

    // update col using index
    if (index !== undefined) {
      switch (index.toString()) {
        case "0":
          board.leftMarked.push(callNum);
          break;
        case "1":
          board.midLeftMarked.push(callNum);
          break;
        case "2":
          board.midColMarked.push(callNum);
          break;
        case "3":
          board.midRightMarked.push(callNum);
          break;
        case "4":
          board.rightMarked.push(callNum);
          break;
      }
    }

    // remove callNum from 'unmarked' nums
    board.unmarked = board.unmarked.filter(num => num !== callNum);
  }
};

// 3) check updated boards for wins
const winCheck = callNum => {
  let gameWon = false;
  let amendArr = [...boardArr]; // logicFix: was mutating boardArr (removing items) while loop ongoing
  let winPic; // logicFix - added visibility of winning row/ col for debug logging

  for (let board of boardArr) {
    // check horizontal
    board.topMarked.length === 5
      ? ((gameWon = true), (winPic = { topMarked: board.topMarked }))
      : null;
    board.midTopMarked.length === 5
      ? ((gameWon = true), (winPic = { midTopMarked: board.midTopMarked }))
      : null;
    board.midMarked.length === 5
      ? ((gameWon = true), (winPic = { midMarked: board.midMarked }))
      : null;
    board.midBotMarked.length === 5
      ? ((gameWon = true), (winPic = { midBotMarked: board.midBotMarked }))
      : null;
    board.botMarked.length === 5
      ? ((gameWon = true), (winPic = { botMarked: board.botMarked }))
      : null;

    // check vertical
    board.leftMarked.length === 5
      ? ((gameWon = true), (winPic = { leftMarked: board.leftMarked }))
      : null;
    board.midLeftMarked.length === 5
      ? ((gameWon = true), (winPic = { midLeftMarked: board.midLeftMarked }))
      : null;
    board.midColMarked.length === 5
      ? ((gameWon = true), (winPic = { midColMarked: board.midColMarked }))
      : null;
    board.midRightMarked.length === 5
      ? ((gameWon = true), (winPic = { midRightMarked: board.midRightMarked }))
      : null;
    board.rightMarked.length === 5
      ? ((gameWon = true), (winPic = { rightMarked: board.rightMarked }))
      : null;

    if (gameWon) {
      const boardTotal = totaller(board.unmarked);
      console.log("\nGame Won on:", Number(callNum), "finishTotal:", boardTotal * callNum);
      console.log(winPic);
      amendArr.splice(amendArr.indexOf(board), 1); // logicFix - was originally mutating boardArr
      console.log("Unwon boards:", amendArr.length);
      gameWon = false; // logicFix - gameWon was truthy for all other boards until reset added!
    }
  }
  boardArr = [...amendArr]; // update boardArr, remove winning boards AFTER loop is finished
  return false;
};

const callNumbers = callArr => {
    for (let call of callArr) {
      updateBoards(call);
      winCheck(call);
    }
};
callNumbers(bingoCalls); // pt. 1 = 54275   // pt. 2: 13158

