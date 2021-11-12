// DISPLAY FUNCTIONS
// Show Funtions
const showTic = (ticCon) => {
    ticCon.style.display = "flex"
}
const showGame = (gameCon) => {
    gameCon.style.display = "flex"
}
const showPlayer = (playerCon) => {
    playerCon.style.display = "flex"
}
const showWon = (wonsCon) => {
    wonsCon.style.display = "flex"
}
// Hide Funtions
const hideTic = (ticCon) => {
    ticCon.style.display = "none"
}
const hidePlayer = (playerCon) => {
    playerCon.style.display = "none"
}
const hideWon = (wonsCon) => {
    wonsCon.style.display = "none"
}
const hideGame = (gameCon) => {
    gameCon.style.display = "none"
}
export {
    showGame, showPlayer, showTic, showWon, hideGame, hidePlayer, hideTic, hideWon
}