const TEAM = ["A", "B"]
const VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

 export default class Split {
    constructor(tokens = freshSplit()) {
        this.tokens = tokens
    }  

    get numberOfTokens() {
        return this.tokens.length
    }

    pop() {
        return this.tokens.shift()
    }

    push(token) {
        this.tokens.push(token)
    } 

    // Tämä sekoittaa pelimerkkien järjestyksen
    shuffle() {
        for (let i = this.numberOfTokens - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.tokens[newIndex]
            this.tokens[newIndex] = this.tokens[i]
            this.tokens[i] = oldValue
        }
    }
 }

class Token {
    constructor(team, value) {
        this.team = team
        this.value = value
    }

    //Määritetään pelimerkkien värijako
    get color() {
        return this.team === 'A' ? 'red' : 'blue'
    }
    
    getHTML() {
        const tokenDiv = document.createElement('div')
        tokenDiv.classList.add("token", this.color)
        tokenDiv.dataset.value = `${this.value} ${this.team}`
        return tokenDiv
    }
}

// Jaetaan joukkueet
function freshSplit() {
    return TEAM.flatMap(team => {
      return VALUES.map(value => {
        return new Token(team, value)
    })
  })
}