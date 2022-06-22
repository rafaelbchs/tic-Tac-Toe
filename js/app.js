let player1_name = window.prompt("Before we start, I need you to tell me your name.")

let player2_name = window.prompt("Hello, " + player1_name + ". Are you going to play with someone else? If you are, type the name of the player. Otherwise, type no")

let player1 = document.getElementsByClassName("player1")[0]
player1.innerHTML = player1_name

let player2 = document.getElementsByClassName("player2")[0]

if (player2_name === "no"){
    player2_name = "Computer"
} else {
    player2.innerHTML = player2_name
}
    
let displayTurn = document.getElementsByTagName("p")[0]

function chosenPlayer(){
    if (Math.random() < 0.5){
        displayTurn.innerHTML = player1_name + " will play first. Represented by the Xs"
    } else {
        displayTurn.innerHTML = player2_name + " will play first. Represented by the Os"
    }
}

chosenPlayer();

let initialState;
const gameState = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

const board = document.getElementById("table")

function makeRow() {
    let newRow = document.createElement("tr")
    for (let i = 0; i < 3; i++){
        let newTd = document.createElement("td")
        newRow.appendChild(newTd)
    }    
    table.appendChild(newRow)
}
makeRow()
makeRow()
makeRow()

player = "o"

function playerMove(event){
    let clickedElement = event.target
    if (clickedElement.tagName === "TD") {
        clickedElement.innerHTML = player.toUpperCase()
        clickedElement.classList.add(player, "disabled")
    }
}

board.addEventListener("click", playerMove)














let puzzle = [
    ["x", 'o', "x"],
    ["o", "x", "o"],
    ["x", "o", "x"]
]

let p8zzle = [
    ["x", "x", "o"],
    ["o", "o", "x"],
    ["x", "o", "x"]
]

function getRow(board, rowIndex){
    let arr = []
    let currentRow = board[rowIndex]
    for (let i = 0; i < currentRow.length; i++){
        let play = currentRow[i]
        arr.push(play)
    }
    return arr
}

function getColumn(board, colIndex){
    let arr = []
    for (let i = 0; i < board.length; i++) {
        let play = board[i][colIndex]
        arr.push(play)
    }
    return arr
}

function getDiagonal(board, diagNumber){
    let arr = []
    if (!diagNumber){
        for (let i = 0; i < board.length; i++){
            let play = board[i][i]
            arr.push(play)
        }
    } else {
        for (let i = 2, j = 0; i > -1 ; i--, j++) {
            let play = board[i][j]
            arr.push(play)
            }   
    }
    return arr
}


function checkWinner(arrToCheck){
    let winnerA = ["x", "x", "x"].toString()
    let winnerB = ["o", "o", "o"].toString()
    let arrToCompare = arrToCheck.toString()
    if (arrToCompare === winnerA) {
        return true
    }
    if (arrToCompare === winnerB){
        return true
    }
    return false
}

function endOfGame(board){
    for (let i = 0; i < board.length;i++){
        let rowChecked = getRow(board, i)
        let rowAnswer = checkWinner(rowChecked)
        if (rowAnswer){
            return true
        }
        let colChecked = getColumn(board, i)
        let colAnswer = checkWinner(colChecked)
        if (colAnswer){
            return true
        }
    }
    for (let i = 0; i < 2 ; i++){
        let diagonalChecked = getDiagonal(board, i)
        let diagAnswer = checkWinner(diagonalChecked)
        if (diagAnswer){
            return true
        }
    }
    return false
}

// console.log(getRow(puzzle, 0))
// console.log(getColumn(puzzle, 2))
// console.log(getDiagonal(puzzle, 1))
// console.log(endOfGame(puzzle))
