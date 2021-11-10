// VARIABLES:
// player vars
let playerChoice = ""
let noOfPlayers = 1
// Game Variables
let isMultiplayer = false
// containers
let playerCon = document.querySelector('.choose-player')
let ticCon = document.querySelector('.choose-tictac')
let gameCon = document.querySelector('.game')
let wonsCon = document.querySelector('.won')
// img elements
const X = '<img src="./assets/tic.png" class="box-img" alt="tic">'
const O = '<img src="./assets/tac.png" class="box-img" alt="tac">'
// box id
let boxId = ""
// box that is clicked
let clickedBox = ""
// score vars
let wins = 0
let losts = 0
let ties = 0
// score board cons
let winCon = document.querySelector(".wins span")
let tiesCon = document.querySelector(".ties span")
let lostsCon = document.querySelector(".losts span")
// other vars
let turn = "x"
let isGameOver = false
// boxes
let boxes = document.getElementsByClassName('box')
// add every box from boxes array 
Array.from(boxes).forEach(box => {
    // when clicked
    box.addEventListener('click', () => {
        // if game is not over
        if (!isGameOver) {
            // get clicked box id
            boxId = box.id
            clickedBox = document.getElementById(boxId)
            // box operations
            boxOperations()
            checkPlayers()
            setScores()
        }
    })
})

// FUNTIONS:
// DISPLAY FUNCTIONS
// Show Funtions
const showTic = () => {
    ticCon.style.display = "flex"
}
const showGame = () => {
    gameCon.style.display = "flex"
}
const showPlayer = () => {
    playerCon.style.display = "flex"
}
const showWon = () => {
    wonsCon.style.display = "flex"
}
// Hide Funtions
const hideTic = () => {
    ticCon.style.display = "none"
}
const hidePlayer = () => {
    playerCon.style.display = "none"
}
const hideWon = () => {
    wonsCon.style.display = "none"
}
const hideGame = () => {
    gameCon.style.display = "none"
}
// Select no of players
const players1 = () => {
    isMultiplayer = false
    noOfPlayers = 1
    hidePlayer()
    showTic()
}
const players2 = () => {
    noOfPlayers = 2
    playerChoice = 'x'
    isMultiplayer = true
    hidePlayer()
    showGame()
}
// Choose Tic-Tac
const choseTic = () => {
    playerChoice = "x"
    hideTic()
    showGame()
}
const choseTac = () => {
    playerChoice = "o"
    hideTic()
    showGame()
    userIsTac()
}
// Decicive Funtion
const checkPlayers = () => {
    if (!isMultiplayer) {
        nextTurn()
    }
}
// if user is tac then comp makes the first move
const userIsTac = () => {
    checkPlayers();
}
// operations to be performed on box
const boxOperations = () => {
    var child = makeChild()
    // if box already not have a child
    if (clickedBox.childElementCount == 0) {
        // add element in box
        clickedBox.innerHTML = child
        // check if won
        checkWin()
        // check if ties
        checkTied()
        // chnage turn
        turn = changeTurn()
    }
}
// make child element
const makeChild = () => {
    return turn === "x" ? X : O
}
// turn changing funtion
const changeTurn = () => {
    return turn === "x" ? "o" : "x"
}
// set scores funtion
const setScores = () => {
    winCon.innerHTML = wins
    lostsCon.innerHTML = losts
    tiesCon.innerHTML = ties
}
// check ties
const checkTied = () => {
    var boxes = document.getElementsByClassName("box")
    // check if box has a child
    if (((boxes[0].innerHTML === X || boxes[0].innerHTML === O) && (boxes[1].innerHTML === X
        || boxes[1].innerHTML === O) && (boxes[2].innerHTML === X || boxes[2].innerHTML === O) &&
        (boxes[3].innerHTML === X || boxes[3].innerHTML === O) && (boxes[4].innerHTML === X ||
            boxes[4].innerHTML === O) && (boxes[5].innerHTML === X || boxes[5].innerHTML === O) &&
        (boxes[6].innerHTML === X || boxes[6].innerHTML === O) && (boxes[7].innerHTML === X ||
            boxes[7].innerHTML === O) && (boxes[8].innerHTML === X || boxes[8].innerHTML === O))) {
        tied()
    }
}
// tied funtion
const tied = () => {
    isGameOver = true
    ties = ties + 1
    setTimeout(() => {
        hideGame()
        showWon()
    }, 1000);
    wonsCon.querySelector('h3').innerText = "Game Tied"
    setTimeout(() => {
        gameOver()
    }, 5000);
}
// check winning
const checkWin = () => {
    // winning possibilities
    let wining = [
        // -> horizontal win cases
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // ^ vertical win cases
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // \ diagonal win cases
        [0, 4, 8],
        [2, 4, 6]
    ]
    wining.forEach(e => {
        if ((boxes[e[0]].innerHTML === boxes[e[1]].innerHTML) && (boxes[e[1]].innerHTML === boxes[e[2]].innerHTML) && (boxes[e[0]].innerHTML !== "")) {
            win()
        }
    })
}
//  win funtion 
const win = () => {
    isGameOver = true
    if (turn === 'x')
        wins = wins + 1
    else losts = losts + 1
    setTimeout(() => {
        hideGame()
        showWon()
    }, 1000);
    document.querySelector('.win-img-con').innerHTML = makeChild()
    setTimeout(() => {
        gameOver()
    }, 5000);
}
// game over funtion
const gameOver = () => {
    Array.from(boxes).forEach(box => {
        box.innerHTML = ""
    })
    hideWon()
    showGame()
    turn = playerChoice
    isGameOver = false
}
// reset button
function reset() {
    wins = 0
    ties = 0
    losts = 0
    setScores()
}

// Computer Funtions
// to select next random available spot to move
function nextTurn() {
    var available = []
    var moveMade = false
    for (var i = 0; i < 9; i++) {
        var freebox = document.getElementById(boxes[i].id)
        if (freebox.childElementCount == 0)
            available.push(i)
    }
    while (!moveMade) {
        let move = Math.floor(Math.random() * 10)
        available.forEach((j) => {
            if (move == j) {
                makeMove(move)
                moveMade = true
            }
        })
        if (available.length == 1) {
            makeMove(available[0])
            moveMade = true
        }
    }
}
// Make Move Funtion
function makeMove(compMove) {
    clickedBox = boxes[compMove]
    boxId = boxes[compMove].id
    changeTurn()
    boxOperations();
}