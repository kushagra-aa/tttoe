playerCon = document.querySelector('.choose-player')
ticCon = document.querySelector('.choose-tictac')
gameCon = document.querySelector('.game')
const showTic = () => {
    playerCon.style.display = "none"
    ticCon.style.display = "flex"
}
const showGame = () => {
    ticCon.style.display = "none"
    gameCon.style.display = "flex"
}
const showPlayer = () => {
    gameCon.style.display = "none"
    playerCon.style.display = "flex"
}