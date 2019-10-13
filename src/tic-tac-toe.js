class TicTacToe {
    constructor() {
        this.chosenSymbol = "x";
        this.winner = null;
        this.playfield = [
          [null, null, null], 
          [null, null, null], 
          [null, null, null]
        ];
        this.winConditions = [
            [0,0,0,1,0,2],
            [1,0,1,1,1,2],
            [0,0,1,0,2,0],
            [0,1,1,1,2,1],
            [2,0,2,1,2,2],
            [0,2,1,2,2,2],
            [0,0,1,1,2,2],
            [2,0,1,1,0,2]
        ]
    }

    getCurrentPlayerSymbol() {
        return this.chosenSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.playfield[rowIndex][columnIndex] == null) {
            this.playfield[rowIndex][columnIndex] = this.chosenSymbol;
            this.toggleSymbol();
          }
         
    }

    isFinished() {
        
        if(this.isDraw() || this.getWinner() !== null) return true;

        return false;
    }

    getWinner() {

        this.winConditions.forEach(element => {
            const trans = this.transformCondition(element);
            if (trans.every(x => x === 'x')) {
              this.winner = 'x';
              return;
            }

            if (trans.every(x => x === 'o')) {
              this.winner = 'o';
              return;
            }
          });

        return this.winner;
    }

    noMoreTurns() {
        return this.fieldIsFull() ? true : false;
    }

    isDraw() {

        return (this.noMoreTurns() && (this.getWinner() === null)) ? true : false;
        
    }

    getFieldValue(rowIndex, colIndex) {
        return this.playfield[rowIndex][colIndex];
    }

    //Support functions
    
    toggleSymbol() {
        if(this.chosenSymbol === 'x') {
            this.chosenSymbol = 'o';
        } else {
            this.chosenSymbol = 'x';
        }
    }

    transformCondition(adresses) {
        const transformedCond = [
         this.playfield[adresses[0]][adresses[1]],
         this.playfield[adresses[2]][adresses[3]],
         this.playfield[adresses[4]][adresses[5]]
        ];

      return transformedCond;
    }

    fieldIsFull() {
        let filledCells = 0;

        for(let row of this.playfield) {

          for(let cell of row) {
              if (cell !== null) filledCells++;
          }

        }

        return filledCells === 9 ? true : false;
    }
}

module.exports = TicTacToe;