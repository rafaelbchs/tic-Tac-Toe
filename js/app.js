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

//CHOOSE DIFFICULTY

// CHANGING THE PLAYERS' NAMES
let player1 = document.getElementsByClassName("player1")[0];
player1.innerHTML = player1_name;

let player2 = document.getElementsByClassName("player2")[0];

// IF THERE'S NO 2ND PLAYER, THE COMPUTER PLAYS.
let hardMode = false;
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

//SETTING THE BOARD
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
    let currentCol = clickedElement.cellIndex;
    let currentRow = clickedElement.parentNode.rowIndex;
    initialGame.board[currentRow][currentCol] = currentPlayer;
    clickedElement.innerHTML = currentPlayer.toUpperCase();
    clickedElement.classList.add(currentPlayer, "disabled");
    endOfGame(initialGame.board);
    setTimeout(function () {
      computerPlays();
    }, 300);
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
//ENDS THE GAME
function endOfGame(board) {
  for (let i = 0; i < board.length; i++) {
    let rowChecked = getRow(board, i);
    let rowAnswer = checkWinner(rowChecked);
    if (rowAnswer) {
      winner = true;
      gameFinished();
    }
    let colChecked = getColumn(board, i);
    let colAnswer = checkWinner(colChecked);
    if (colAnswer) {
      winner = true;
      gameFinished();
    }
  }
  for (let i = 0; i < 2; i++) {
    let diagonalChecked = getDiagonal(board, i);
    let diagAnswer = checkWinner(diagonalChecked);
    if (diagAnswer) {
      winner = true;
      gameFinished();
    }
  }
  getDraw();
}

//CHECKS FOR DRAW
function getDraw() {
  let completeBoard = initialGame.board.toString();
  if (completeBoard.length === 17 && winner === false) {
    setTimeout(function () {
      let playAgain = window
        .prompt("It's a draw, would you like to play again?")
        .toLowerCase();
      if (playAgain === "yes") {
        resetBoard();
      } else {
        goodBye();
      }
    }, 100);
  }
}

// SHOWS THAT THE GAME FINISHED
function gameFinished() {
  let cells = document.getElementsByTagName("td");
  Array.from(cells).forEach((cell) => cell.classList.add("endofgame"));

  setTimeout(function () {
    if (currentPlayer === "o") {
      let playAgain = window
        .prompt(`The winner is ${player1_name}, would you like to play again?`)
        .toLowerCase();
      if (playAgain === "yes") {
        // RESTARTS THE GAME
        resetBoard();
      } else {
        goodBye();
      }
    } else {
      let playAgain = window
        .prompt(`The winner is ${player2_name}, would you like to play again?`)
        .toLowerCase();
      if (playAgain === "yes") {
        // RESTARTS THE GAME
        resetBoard();
      } else {
        goodBye();
      }
    }
  }, 1000);
}

//RESTART OF THE GAME
function resetBoard() {
  let cells = document.getElementsByTagName("td");
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

//COMPUTER AI
function computerPlays() {
  if (hardMode) {
    playHard();
  } else {
    playNormal();
  }
}

// ALLOWS THE COMPUTER (IF CHOSEN) TO PLAY FIRST
setTimeout(function () {
  computerPlays();
}, 300);

//HARD DIFFICULTY FIX AI HARD MODE. Please forgive me, I had to hard code the first part. I couldn't wrap my head around it.
function playHard() {
  let allCells = document.getElementsByTagName("td");
  let row0 = [allCells[0], allCells[1], allCells[2]];
  let row1 = [allCells[3], allCells[4], allCells[5]];
  let row2 = [allCells[6], allCells[7], allCells[8]];

  let col0 = [allCells[0], allCells[3], allCells[6]];
  let col1 = [allCells[1], allCells[4], allCells[7]];
  let col2 = [allCells[2], allCells[5], allCells[8]];

  let diag1 = [allCells[0], allCells[4], allCells[8]];
  let diag2 = [allCells[2], allCells[4], allCells[6]];

  let currentBoard = [row0, row1, row2, col0, col1, col2, diag1, diag2];

  let foundXs = false;
  if (player2_name === "Computer" && currentPlayer === "o" && !winner) {
    for (let i = 0; i < currentBoard.length; i++) {
      let cellsToCheck = currentBoard[i];
      let xCounter = 0;
      let oCounter = 0;
      for (let j = 0; j < 3; j++) {
        let currentCell = cellsToCheck[j];
        if (currentCell.textContent === "X") {
          xCounter++;
        } else if (currentCell.textContent === "O") {
          oCounter++;
        }
      }
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
    if (!foundXs) {
      playNormal();
    }
  }
}

//NORMAL DIFFICULTY
function playNormal() {
  if (player2_name === "Computer" && currentPlayer === "o" && !winner) {
    let allCells = document.getElementsByTagName("td");
    let availableCells = [];
    for (let i = 0; i < allCells.length; i++) {
      if (allCells[i].textContent === "") {
        availableCells.push(allCells[i]);
      }
    }
    let randomCell = Math.floor(Math.random() * availableCells.length);
    let chosenCell = availableCells[randomCell];
    chosenCell.click();
  }
}
