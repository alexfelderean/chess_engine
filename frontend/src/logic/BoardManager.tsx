import {fetchLegalMoves, fetchComputerMove} from '../api/chessAPI';

class BoardManager {
    board: Array<string>;
    legalMoves: Array<Array<Array<number>>>;
    highlights: Array<boolean>;
    canCastle: Array<string>; // {K, Q, k, q}
  
    constructor() {
        this.board = new Array(64);
        this.legalMoves = Array.from({ length: 64 }, () => []);
        this.highlights = Array.from({length: 64}, () => false);
        this.canCastle = ['K', 'Q', 'k', 'q'];

        this.setStartingPosition();
    }

    async setStartingPosition() {
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

        await this.setLegalMoves('w');
    }

    generateFenString(turn: string) {
        let fen = '';
        let count = 0;
        for(let i = 0; i < 64; i++) {
            if(i !== 0 && i % 8 === 0) {
                if(count > 0) {
                    fen += count;
                    count = 0;
                }
                fen += '/';
            }
            if(this.board[i] !== '' && this.board[i] != '*') {
                if(count > 0) {
                    fen += count;
                    count = 0;
                }
                fen += this.board[i];
            }
            else {
                count += 1;
            }
        }

        fen += count > 0 ? count : '';
        
        fen += ' ' + turn + ' '; // indicate black to move change if you want to allow user to play as black

        for(const s of this.canCastle) {
            fen += s;
        }

        return fen;
    }

    async setLegalMoves(turn: string) {
        const fen = this.generateFenString(turn);
        const moves = await fetchLegalMoves(fen);
        
        console.log(fen);
        this.legalMoves = Array.from({ length: 64 }, () => []);

        for(const move of moves) {
            const from = move.charCodeAt(0) - 'a'.charCodeAt(0) + ((8 - parseInt(move[1], 10)) * 8);
            const to = move.charCodeAt(2) - 'a'.charCodeAt(0) + ((8 - parseInt(move[3], 10)) * 8);
            const promotion = 0; // move.length > 4 ? move[4] : "";
            this.legalMoves[from].push([to, promotion]);
        }
    }

    addHighlights(index: number): number {
        let count = 0;
        for(let i = 0; i < this.legalMoves[index].length; i++) {
            this.highlights[this.legalMoves[index][i][0]] = true;
            count += 1;
        }
        return count;
    }

    removeHighlights(index: number) {
        this.highlights = Array.from({length: 64}, () => false);
    }

    isValidMove(from: number, to: number): boolean {
        for(let i = 0; i < this.legalMoves[from].length; i++) {
            if(this.legalMoves[from][i][0] === to) {
                return true;
            }
        }
        return false;
    }

    async makeComputerMove() {
        const fen = this.generateFenString('b');
        const move = await fetchComputerMove(fen, 4); // hardcoded max depth for now figure out how to adjust later

        const from = move.charCodeAt(0) - 'a'.charCodeAt(0) + ((8 - parseInt(move[1], 10)) * 8);
        const to = move.charCodeAt(2) - 'a'.charCodeAt(0) + ((8 - parseInt(move[3], 10)) * 8);

        if(from === 4 && to === 7) {
            this.board[6] = 'k';
            this.board[4] = '';

            this.board[5] = 'r';
            this.board[7] = ''; 
        }
        else if(from === 4 && to === 2) {
            this.board[2] = 'k';
            this.board[4] = '';

            this.board[3] = 'r';
            this.board[0] = '';
        }
        else {
            this.board[to] = this.board[from];
            this.board[from] = '';
        }

        if(from === 4) {
            // white king moved
            this.canCastle[2] = '';
            this.canCastle[3] = '';
        }
        else if(from === 7) {
            this.canCastle[2] = '';
        }
        else if(from === 0) {
            this.canCastle[3] = '';
        }

        await this.setLegalMoves('w');
    }

    makeUserMove(from: number, to: number) {
        // check if user castled (king side)
        if(from === 60 && to === 62) {
            this.board[62] = 'K';
            this.board[60] = '';

            // move rook to correct square
            this.board[61] = 'R';
            this.board[63] = ''; 

        }
        // queen side
        else if(from === 60 && to === 58) {
            this.board[to] = this.board[from];
            this.board[from] = '';

            // move rook to correct square
            this.board[59] = this.board[56];
            this.board[56] = ''; 

        }
        else {
            this.board[to] = this.board[from];
            this.board[from] = '';
        }

        // keep track of user's castling availability
        if(from === 60) {
            // white king moved
            this.canCastle[0] = '';
            this.canCastle[1] = '';
        }
        else if(from === 63) {
            this.canCastle[0] = '';
        }
        else if(from === 56) {
            this.canCastle[1] = '';
        }
        
    }
}
  
  export default BoardManager;
  