import React, {useState} from 'react';
import styles from './Square.module.css'

interface SquareProps {
    color: string;
    name: string;
    square: number;
    piece: string;
    index: number
    onClick: (name: string, square: number, index: number) => void;
}

function Square({color, name, square, piece, index, onClick}: SquareProps) {
    const [sqPiece, setSqPiece] = useState(piece);

    if(color == "white") {
        return <div 
                    className={styles.white_square}
                    onClick={() => onClick(name, square, index)}
                >
                    {piece==="pawn" && <p>P</p>}
                </div>
    }
    else {
        return <div 
                    className={styles.black_square}
                    onClick={() => onClick(name, square, index)}
                >
                    {piece==="pawn" && <p>P</p>}
                </div>
    }
}

export default React.memo(Square);