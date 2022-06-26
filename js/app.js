// START OF THE GAME
const initialGame = {
  players: ["x", "o"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

//ASKS PLAYERS FOR THEIR NAMES
let player1_name = window.prompt(
  "Before we start, I need you to tell me your name."
);

let player2_name = window.prompt(
  "Hello, " +
    player1_name +
    ". Are you going to play with someone else? If you are, type the name of the player. Otherwise, type no"
);

// IF THERE'S NO 2ND PLAYER, THE COMPUTER PLAYS.
let hardMode = false;
function askPlayerNames() {
  
// CHANGING THE PLAYERS' NAMES
  let player1 = document.getElementsByClassName("player1")[0];
  player1.innerHTML = player1_name;
  let player2 = document.getElementsByClassName("player2")[0];
  //CHOOSE DIFFICULTY
  if (player2_name.toLowerCase() === "no") {
    player2_name = "Computer";
    let difficulty = window
      .prompt("What difficulty would you like to play? Type easy or hard.")
      .toLowerCase();
    if (difficulty === "hard") {
      hardMode = true;
    }
  } else {
    player2.innerHTML = player2_name;
  }
}
askPlayerNames();

// DISPLAYING PLAYERS' NAMES
let displayTurn = document.getElementsByTagName("p")[0];

// RANDOMLY SELECTING A STARTING PLAYER
let currentPlayer = "";

function chosenPlayer() {
  if (Math.random() < 0.5) {
    displayTurn.innerHTML =
      player1_name + " will play first. Represented by the Xs";
    currentPlayer = "x";
  } else {
    displayTurn.innerHTML =
      player2_name + " will play first. Represented by the Os";
    currentPlayer = "o";
  }
}
chosenPlayer();

//STARTS THE BOARD
const board = document.getElementById("table");

function makeRow() {
  let newRow = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    let newTd = document.createElement("td");
    newRow.appendChild(newTd);
  }
  table.appendChild(newRow);
}

makeRow();
makeRow();
makeRow();

// ALTERNATING PLAYERS' TURNS
function playerMove(event) {
  let clickedElement = event.target;
  if (clickedElement.tagName === "TD") {
    // FINDS OUT THE LOCATION OF THE ELEMENT CLICKED
    let currentCol = clickedElement.cellIndex;
    let currentRow = clickedElement.parentNode.rowIndex;

    // CHANGES THE PLAYER ON THE BOARD FOR THE CALCULATIONS
    initialGame.board[currentRow][currentCol] = currentPlayer;

    // DISPLAYS THE LETTER ON THE SCREEN
    clickedElement.innerHTML = currentPlayer.toUpperCase();

    // ADDS STYLE TO CLICKED CELL
    clickedElement.classList.add(currentPlayer, "disabled");

    // CHECKS AFTER EACH CLICK IF THE GAME ENDED
    endOfGame(initialGame.board);

    // ALLOWS THE COMPUTER TO PLAY
    setTimeout(function () {
      computerPlays();
    }, 300);

    // DISPLAYS DIFFERENT PLAYERS ACCORDING THEIR TURNS
    if (currentPlayer === "o") {
      displayTurn.innerHTML = player1_name + "'s turn.";
      currentPlayer = "x";
    } else {
      currentPlayer = "o";
      displayTurn.innerHTML = player2_name + "'s turn.";
    }
  }
}

//CHECKS PLAYERS' CLICKS
board.addEventListener("click", playerMove);

//BOARD VERIFIER

//CHECKS ROWS
function getRow(board, rowIndex) {
  let arr = [];
  let currentRow = board[rowIndex];
  for (let i = 0; i < currentRow.length; i++) {
    let play = currentRow[i];
    arr.push(play);
  }
  return arr;
}

//CHECKS COLUMNS
function getColumn(board, colIndex) {
  let arr = [];
  for (let i = 0; i < board.length; i++) {
    let play = board[i][colIndex];
    arr.push(play);
  }
  return arr;
}

//CHECKS DIAGONALS
function getDiagonal(board, diagNumber) {
  let arr = [];
  if (!diagNumber) {
    for (let i = 0; i < board.length; i++) {
      let play = board[i][i];
      arr.push(play);
    }
  } else {
    for (let i = 2, j = 0; i > -1; i--, j++) {
      let play = board[i][j];
      arr.push(play);
    }
  }
  return arr;
}

//CHECKS IF THERE'S A WINNER
function checkWinner(arrToCheck) {
  let winnerA = ["x", "x", "x"].toString();
  let winnerB = ["o", "o", "o"].toString();
  let arrToCompare = arrToCheck.toString();
  if (arrToCompare === winnerA) {
    return true;
  }
  if (arrToCompare === winnerB) {
    return true;
  }
  return false;
}

let winner = false;
//CHECKS IF THERE'S A WINNER
function endOfGame(board) {
  for (let i = 0; i < board.length; i++) {
    let rowChecked = getRow(board, i);
    let rowAnswer = checkWinner(rowChecked);
    if (rowAnswer) {
      winner = true;
      whoWins();
      gameFinished();
    }
    let colChecked = getColumn(board, i);
    let colAnswer = checkWinner(colChecked);
    if (colAnswer) {
      winner = true;
      whoWins();
      gameFinished();
    }
  }
  for (let i = 0; i < 2; i++) {
    let diagonalChecked = getDiagonal(board, i);
    let diagAnswer = checkWinner(diagonalChecked);
    if (diagAnswer) {
      winner = true;
      whoWins();
      gameFinished();
    }
  }
  getDraw();
}

const cells = document.getElementsByTagName("td");

//WHOS THE WINNER
let winnerIs = "";
function whoWins() {
  if (currentPlayer === "x") {
    winnerIs = player1_name;
  } else {
    winnerIs = player2_name;
  }
}

//CHECKS FOR DRAW
function getDraw() {
  let completeBoard = initialGame.board.toString();
  if (completeBoard.length === 17 && winner === false) {
    // SETS WINNER TO TRUE SO THE COMPUTER WON'T PLAY
    winner = true;

    disableCells();

    // IF IT'S DRAW, DISPLAYS THE PROMPTS.
    setTimeout(function () {
      let playAgain = window
        .prompt("It's a draw, would you like to play again?")
        .toLowerCase();
      if (playAgain === "yes") {
        resetBoard();
      } else {
        goodBye();
      }
    }, 1000);
  }
}

// PREVENTS CLICKING ON AL CELLS AND ADDS STYLE
function disableCells() {
  Array.from(cells).forEach((cell) => cell.classList.add("endofgame"));
}

// SHOWS THAT THE GAME FINISHED
function gameFinished() {
  disableCells();

  setTimeout(function () {
    let playAgain = window
      .prompt(`The winner is ${winnerIs}, would you like to play again?`)
      .toLowerCase();
    if (playAgain === "yes") {
      // RESTARTS THE GAME
      resetBoard();
    } else {
      goodBye();
    }
  }, 1000);
}

//RESTARTS THE GAME
function resetBoard() {
  Array.from(cells).forEach((cell) => {
    cell.classList.remove("endofgame", "x", "o", "disabled");
    cell.innerHTML = null;
  });
  initialGame.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  winner = false;
  setTimeout(function () {
    chosenPlayer();
  }, 500);
  setTimeout(function () {
    computerPlays();
  }, 600);
}

//SAYS GOODBYE
function goodBye() {
  alert("Thank you for playing. See you next time!");
}

//STARTS COMPUTER AI
function computerPlays() {
  if (hardMode) {
    playHard();
  } else {
    playNormal();
  }
}

//HARD DIFFICULTY FIX AI HARD MODE. Please forgive me, I had to hard code the first part. I couldn't wrap my head around it.
function playHard() {
  // GETS ALL THE POSSIBLE WINNING COMBINATIONS OF CELLS
  let row0 = [cells[0], cells[1], cells[2]];
  let row1 = [cells[3], cells[4], cells[5]];
  let row2 = [cells[6], cells[7], cells[8]];

  let col0 = [cells[0], cells[3], cells[6]];
  let col1 = [cells[1], cells[4], cells[7]];
  let col2 = [cells[2], cells[5], cells[8]];

  let diag1 = [cells[0], cells[4], cells[8]];
  let diag2 = [cells[2], cells[4], cells[6]];

  // PUTS THEM IN AN ARRAY
  let currentBoard = [row0, row1, row2, col0, col1, col2, diag1, diag2];

  let foundXs = false;
  // WILL KEEP COUNT OF THE Xs AND Os ON EACH POSSIBLE WINNING COMBINATION
  if (player2_name === "Computer" && currentPlayer === "o" && !winner) {
    for (let i = 0; i < currentBoard.length; i++) {
      let cellsToCheck = currentBoard[i];
      let xCounter = 0;
      let oCounter = 0;
      for (let j = 0; j < 3; j++) {
        let currentCell = cellsToCheck[j];
        // ADDS ONE TO THE COUNTER
        if (currentCell.textContent === "X") {
          xCounter++;
        } else if (currentCell.textContent === "O") {
          oCounter++;
        }
      }
      //IF THE COUNTER IS 2 THAT MEANS IT HAS TO CLICK ON THAT CELL (TO BLOCK A MOVE OR TO WIN THE GAME)
      if (xCounter === 2 || oCounter === 2) {
        for (let k = 0; k < 3; k++) {
          let currentCell = cellsToCheck[k];
          if (currentCell.textContent === "" && !foundXs) {
            currentCell.click();
            foundXs = true;
          }
        }
      }
    }
    // IF IT DIDN'T FIND A WINNING OR LOSING CHOICE, IT'LL PLAY NORMAL.
    if (!foundXs) {
      playNormal();
    }
  }
}

//NORMAL DIFFICULTY
function playNormal() {
  //CHECKS IF THE CELLS ARE AVAILABLE
  if (player2_name === "Computer" && currentPlayer === "o" && !winner) {
    let availableCells = [];
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === "") {
        availableCells.push(cells[i]);
      }
    }
    //GETS A RANDOM AVAILABLE CELL AND CLICKS ON IT
    let randomCell = Math.floor(Math.random() * availableCells.length);
    let chosenCell = availableCells[randomCell];
    chosenCell.click();
  }
}

// ALLOWS THE COMPUTER (IF CHOSEN) TO PLAY FIRST
setTimeout(function () {
  computerPlays();
}, 300);
