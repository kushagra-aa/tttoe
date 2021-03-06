// imports
import * as views from "./views.js";
// VARIABLES:
// audios
const tieAudio = new Audio("./assets/audios/Game_over.wav");
const drawAudio = new Audio("./assets/audios/draw.mp3");
const compWinAudio = new Audio("./assets/audios/Comp-win.wav");
const playerWinAudio = new Audio("./assets/audios/Player-win.mp3");
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
// clickable elements
const player2Btn = document.querySelector('.player-2')
const player1Btn = document.querySelector('.player-1')
const choseTacBtn = document.querySelector('.choice-tac')
const choseTicBtn = document.querySelector('.choice-tic')
// button elements
const resetBtn = document.querySelector('.btn-reset')
const modeBtn = document.querySelector('.btn-mode')
const xoBtn = document.querySelector('.btn-xo')
// box id
let boxId = ""
// box that is clicked
let clickedBox = ""
// score vars:
// local storage vars
let wins = localStorage.getItem("wins")
let ties = localStorage.getItem("ties")
let losts = localStorage.getItem("losts")
// local vars for scores
let localWins = parseInt(wins)
let localTies = parseInt(ties)
let localLosts = parseInt(losts)
// score board cons
let winCon = document.querySelector(".wins span")
let tiesCon = document.querySelector(".ties span")
let lostsCon = document.querySelector(".losts span")
// other vars
let turn = "x"
let isGameOver = false
let isWon = false
// boxes
let boxes = document.getElementsByClassName('box')
// add every box from boxes array 
Array.from(boxes).forEach(box => {
    // when clicked
    box.addEventListener('click', () => {
        // if game is not over
        if (!isGameOver) {
            // get clicked box id
            drawAudio.play()
            boxId = box.id
            clickedBox = document.getElementById(boxId)
            // box operations
            boxOperations()
            if (!isGameOver) checkPlayers();
            setScores()
        }
    })
})

// other operations:
// listening click on buttons
player1Btn.addEventListener('click', () => {
    players1()
})
player2Btn.addEventListener('click', () => {
    players2()
})
choseTicBtn.addEventListener('click', () => {
    choseTic()
})
choseTacBtn.addEventListener('click', () => {
    choseTac()
})
resetBtn.addEventListener('click', () => {
    reset()
})
modeBtn.addEventListener('click', () => {
    changeMode()
})
xoBtn.addEventListener('click', () => {
    changeXO()
})


// FUNTIONS:
// Select no of players
function players1() {
    isMultiplayer = false
    noOfPlayers = 1
    views.hidePlayer(playerCon)
    views.showTic(ticCon)
    document.querySelector(".btn-xo").style.display = "initial"
}
function players2() {
    noOfPlayers = 2
    playerChoice = 'x'
    isMultiplayer = true
    document.querySelector(".btn-xo").style.display = "none"
    views.hidePlayer(playerCon)
    views.showGame(gameCon)
}
// Choose Tic-Tac
function choseTic() {
    playerChoice = "x"
    views.hideTic(ticCon)
    views.showGame(gameCon)
}
function choseTac() {
    playerChoice = "o"
    views.hideTic(ticCon)
    views.showGame(gameCon)
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
    winCon.innerHTML = localWins
    tiesCon.innerHTML = localTies
    lostsCon.innerHTML = localLosts
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
    if (!isGameOver) {
        tieAudio.play()
        isGameOver = true
        addScore(0)
        setTimeout(() => {
            views.hideGame(gameCon)
            views.showWon(wonsCon)
        }, 1000);
        wonsCon.querySelector('h3').innerText = "Game Tied"
        document.querySelector('.win-img-con').innerHTML = ""
        setTimeout(() => {
            gameOver()
        }, 5000);
    }
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
    isWon = true
    setTimeout(() => {
        views.hideGame(gameCon)
        views.showWon(wonsCon)
    }, 500);
    document.querySelector('.win-img-con').innerHTML = makeChild()
    wonsCon.querySelector('h3').innerText = "Won!!"
    setTimeout(() => {
        gameOver()
    }, 2000);
    if (turn === 'x') {
        playerWinAudio.play()
        addScore(1)
    }
    else {
        compWinAudio.play()
        addScore(2)
    }

}
// game over funtion
const gameOver = () => {
    Array.from(boxes).forEach(box => {
        box.innerHTML = ""
    })
    views.hideWon(wonsCon)
    views.showGame(gameCon)
    isWon = false
    isGameOver = false
    turn = "x"
    if (!isMultiplayer && playerChoice === "o") checkPlayers();
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
// add score funtion
const addScore = (which) => {
    // if win
    if (which == -1) {
        localStorage.setItem("wins", String(localWins))
        localStorage.setItem("ties", String(localTies))
        localStorage.setItem("losts", String(localLosts))
    }
    else if (which == 1) {
        localWins = localWins + 1
        localStorage.setItem("wins", String(localWins))
    }
    // if lost
    else if (which == 2) {
        localLosts = localLosts + 1
        localStorage.setItem("losts", String(localLosts))
    }
    // if ties
    else {
        localTies = localTies + 1
        localStorage.setItem("ties", String(localTies))
    }
}
// calling function when page is loaded
const onload = () => {
    // to make localscores=0 for initial load
    if (wins == null) localWins = 0;
    if (losts == null) localLosts = 0;
    if (ties == null) localTies = 0;
    setScores()
}
onload()

// reset button
function reset() {
    localWins = 0
    localTies = 0
    localLosts = 0
    addScore(-1);
    setScores()
}
function changeMode() {
    gameOver()
    views.showPlayer(playerCon)
    views.hideGame(gameCon)
}
function changeXO() {
    playerChoice = 'x'
    gameOver()
    views.showTic(ticCon)
    views.hideGame(gameCon)
}