module.exports = class Game {
    constructor() {
        this.players = [];
        this.scoreBoard = [];
    }

    scoreEntry(str) {
        const regex = /[\W_]/g;
        const lowRegStr = str.toLowerCase().replace(regex, '');
        const reverseStr = lowRegStr.split('').reverse().join('');
        return reverseStr === lowRegStr ? lowRegStr.length : 0;
    }

    submitEntry(name, entry) {
        const points = this.scoreEntry(entry);
        const playerIndex = this.scoreBoard.findIndex(player => player.name === name)
        if (playerIndex > -1) {
            const player = this.scoreBoard[playerIndex];

            if (!player.usedWords.includes(entry)) {
                player.points += points
                player.usedWords.push(entry);

                return {
                    success: true,
                    msg: `Player ${player.name} has scored ${points} points`
                }
            } else {
                return {
                    success: false,
                    msg: `Player ${player.name} has already used the word: ${entry}`
                }
            }
        } else {
            console.log('new player alert')
            this.scoreBoard.push({
                name,
                usedWords: [entry],
                points
            });

            return {
                success: true,
                msg: `Player ${name} has scored ${points} points`
            }
        }
    }

    getTopScores() {
        console.log(this.scoreBoard);
        const sortedScores = this.scoreBoard.sort(function(firstElement, secondElement) {
            return secondElement.points  - firstElement.points;
        });

        return sortedScores.slice(0, 5);
    }
}




