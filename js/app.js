const initialGame = {
  players: ["x", "o"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

let player1_name = window.prompt(
  "Before we start, I need you to tell me your name."
);

let player2_name = window.prompt(
  "Hello, " +
    player1_name +
    ". Are you going to play with someone else? If you are, type the name of the player. Otherwise, type no"
);

let player1 = document.getElementsByClassName("player1")[0];
player1.innerHTML = player1_name;

let player2 = document.getElementsByClassName("player2")[0];

if (player2_name === "no") {
  player2_name = "Computer";
} else {
  player2.innerHTML = player2_name;
}

let displayTurn = document.getElementsByTagName("p")[0];

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

function playerMove(event) {
  let clickedElement = event.target;
  if (clickedElement.tagName === "TD") {
    let currentCol = clickedElement.cellIndex;
    let currentRow = clickedElement.parentNode.rowIndex;
    initialGame.board[currentRow][currentCol] = currentPlayer;
    clickedElement.innerHTML = currentPlayer.toUpperCase();
    clickedElement.classList.add(currentPlayer, "disabled");
    console.log(initialGame.board)
    endOfGame(initialGame.board);
  }
  if (currentPlayer === "o") {
    displayTurn.innerHTML = player1_name + "'s turn.";
    currentPlayer = "x";
  } else {
    currentPlayer = "o";
    displayTurn.innerHTML = player2_name + "'s turn.";
  }
}

board.addEventListener("click", playerMove);

function getRow(board, rowIndex) {
  let arr = [];
  let currentRow = board[rowIndex];
  for (let i = 0; i < currentRow.length; i++) {
    let play = currentRow[i];
    arr.push(play);
  }
  return arr;
}

function getColumn(board, colIndex) {
  let arr = [];
  for (let i = 0; i < board.length; i++) {
    let play = board[i][colIndex];
    arr.push(play);
  }
  return arr;
}

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

function checkWinner(arrToCheck) {
  let winnerA = ["x", "x", "x"].toString();
  let winnerB = ["o", "o", "o"].toString();
  let arrToCompare = arrToCheck.toString();
  if (arrToCompare === winnerA) {
    return true;
    console.log("You've finished the game")
  }
  if (arrToCompare === winnerB) {
    return true;
    console.log("You've finished the game")
  }
  return false;
}

function endOfGame(board) {
  for (let i = 0; i < board.length; i++) {
    let rowChecked = getRow(board, i);
    let rowAnswer = checkWinner(rowChecked);
    if (rowAnswer) {
      return true;
      console.log("You've finished the game")
    }
    let colChecked = getColumn(board, i);
    let colAnswer = checkWinner(colChecked);
    if (colAnswer) {
      return true;
      console.log("You've finished the game")
    }
  }
  for (let i = 0; i < 2; i++) {
    let diagonalChecked = getDiagonal(board, i);
    let diagAnswer = checkWinner(diagonalChecked);
    if (diagAnswer) {
      return true;
      console.log("You've finished the game")
    }
  }
  return false
}

