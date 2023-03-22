import Split from "./numbers.js"

// Määritetty pelimerkkien arvot
const TOKEN_VALUE_MAP = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
}

// Määritellään pelimerkkien pinot sekä jako tarkemmin
const computerTokenSlot = document.querySelector(".computer-token-slot")
const playerTokenSlot = document.querySelector(".player-token-slot")
const computerSplitElement = document.querySelector('.computer-split')
const playerSplitElement = document.querySelector('.player-split')
const text = document.querySelector('.text')

const split = new Split
split.shuffle()
console.log(split.tokens)

let playerSplit, computerSplit, inRound, stop

document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipTokens()
    }
})

// Pelin aloitus
startGame()
    function startGame() {
    const split = new Split()
    split.shuffle()

    const splitMidpoint = Math.ceil(split.numberOfTokens / 2)
    playerSplit = new Split(split.tokens.slice(0, splitMidpoint))
    computerSplit = new Split(split.tokens.slice(splitMidpoint, split.numberOfTokens))
    inRound = false
    stop = false

    console.log(playerSplit)
    console.log(computerSplit)

    cleanBeforeRound()
    }

function cleanBeforeRound() {
    inRound = false
    computerTokenSlot.innerHTML = ''
    playerTokenSlot.innerHTML = ''
    text.innerText = ''

    updateSplitCount()
}

// Pelimerkkien kääntö ja uudelleen pakkaan laittaminen
function flipTokens() {
    inRound = true

    const playerToken = playerSplit.pop()
    const computerToken = computerSplit.pop()

    playerTokenSlot.appendChild(playerToken.getHTML())
    computerTokenSlot.appendChild(computerToken.getHTML())

    updateSplitCount()

    if(isRoundWinner(playerToken, computerToken)) {
        text.innerText = "WIN"
        playerSplit.push(playerToken)
        playerSplit.push(computerToken)
    } else if (isRoundWinner(computerToken, playerToken)) {
        text.innerText = "LOSE"
        computerSplit.push(playerToken)
        computerSplit.push(computerToken)
    } else {
        text.innerText = "DRAW"
        playerSplit.push(playerToken)
        computerSplit.push(computerToken)
    }

    if (isGameOver(playerSplit)) {
        text.innerText = 'YOU LOSE!'
        stop = true
    } else if (isGameOver(computerSplit)) {
        text.innerText = 'YOU WIN!!!!!'
        stop = true
    }
}

function updateSplitCount() {
    computerSplitElement.innerText = computerSplit.numberOfTokens
    playerSplitElement.innerText = playerSplit.numberOfTokens
}

function isRoundWinner(tokenOne, tokenTwo) {
    return TOKEN_VALUE_MAP[tokenOne.value] > TOKEN_VALUE_MAP[tokenTwo.value]
}

function isGameOver(split) {
    return split.numberOfTokens === 0
}

