class BoardManager {
    board: Array<string>;
    legalMoves: Array<Array<number>>;
  
    constructor() {
        this.board = new Array(64);
        this.legalMoves = Array.from({ length: 64 }, () => []);

        this.setStartingPosition();
      
    }

    setStartingPosition() {
        this.board[0] = 'r';
        this.board[1] = 'n';
        this.board[2] = 'b';
        this.board[3] = 'q';
        this.board[4] = 'k';
        this.board[5] = 'b';
        this.board[6] = 'n';
        this.board[7] = 'r';
        
        let i = 8;
        for (i = 8; i < 16; i++) {
            this.board[i] = 'p';
        }

        for(i = 16; i < 48; i++) {
            this.board[i] = '';
        }
    
        for (i = 48; i < 56; i++) {
            this.board[i] = 'P';
        }
        this.board[56] = 'R';
        this.board[57] = 'N';
        this.board[58] = 'B';
        this.board[59] = 'Q';
        this.board[60] = 'K';
        this.board[61] = 'B';
        this.board[62] = 'N';
        this.board[63] = 'R';
    }

    getBoard() {
        return this.board;
    }

    move(from: number, to: number) {
        this.board[to] = this.board[from];
        this.board[from] = '';
    }

    generateFenString() {
        let fen = '';
        let count = 0;
        for(let i = 0; i < 64; i++) {
            if(i !== 0 && i % 8 === 0) {
                fen += '/';
            }
            if(this.board[i] !== '') {
                if(count > 0) {
                    fen += count;
                    count = 0;
                }
                fen += this.board[i];
            }
            else {
                count += 1;
            }

            if(count === 8) {
                fen += count;
                count = 0;
            }

            
        }
        
        fen += ' b'; // indicate black to move change if you want to allow user to play as bloack
        return fen;
    }
}
  
  export default BoardManager;
  