class TicTacToe {
    constructor() {
        this.chosenSymbol = 'x';
        this.winner = null;
        this.currentTurn = 0;
        this.finished = false;
        this.playfield = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.actualWinConditions = [
            [0,0,0,1,0,2],
            [1,0,1,1,1,2],
            [0,0,1,0,2,0],
            [0,1,1,1,2,1],
            [2,0,2,1,2,2],
            [0,2,1,2,2,2],
            [0,0,1,1,2,2],
            [2,0,1,1,0,2] 
        ];
    }

    transformCondition(adresses) {
            const transformedCond = [
             this.playfield[adresses[0]][adresses[1]],
             this.playfield[adresses[2]][adresses[3]],
             this.playfield[adresses[4]][adresses[5]]
            ];

          return transformedCond;
    }

    checkWinConditions() {
            this.actualWinConditions.forEach(element => {
              const trans = this.transformCondition(element);
              if (trans.every(x => x === this.chosenSymbol)) {
                this.finished = true;
                this.winner = this.chosenSymbol;
              }
            });
          }

    adressExists(rowIndex, cellIndex) {
        if (rowIndex > 2 || rowIndex < 0 || cellIndex > 2 || cellIndex < 0){
            return false;
          }
          return true;
    }

    adressUsed(rowIndex, cellIndex) {
        return this.playfield[rowIndex][cellIndex] !== null ? true: false;
    }

    fieldIsFull() {
           const pf = this.playfield,
          resArr = [];
          for (let i = 0; i < 3; i++) {
            resArr.push(pf[i][0]);
            resArr.push(pf[i][1]);
            resArr.push(pf[i][2]);
          }
          return resArr.every(x => {
            return x !== null;
          });
    } 

    getCurrentPlayerSymbol() {
        return this.chosenSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if(!this.adressUsed(rowIndex, columnIndex) && !this.isFinished() && this.adressExists(rowIndex, columnIndex)) {
            this.playfield[rowIndex][columnIndex] = this.chosenSymbol;
            this.currentTurn++;
            this.checkWinConditions();
            if(!this.isFinished()) {
                this.chosenSymbol = this.chosenSymbol === 'x' ? 'o' : 'x';
            }
        }
    }

    isFinished() {
        return this.finished;
    }

    getWinner() {
        return this.winner;
    }

    noMoreTurns() {
        return this.currentTurn === 9 ? true : false;
    }

    isDraw() {
        return ((this.finished === true) && (this.winner === null)) ? true : false;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.playfield[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
