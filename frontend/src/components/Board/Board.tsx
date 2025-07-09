import React, {useState} from 'react';
import styles from './Board.module.css'
import Square from './../Square/Square'

function Board() {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    const [squares, setSquares] = useState(
        Array.from({length: 64}, (_, i) => {
        const color = ((Math.floor(i % 8) + Math.floor(i / 8)) % 2 === 0) ? "white" : "black"
        const name = files[Math.floor(i % 8)] + String(8 - Math.floor(i / 8));
        const square = (Math.floor((63 - i) / 8) * 8) + 7 - Math.floor((63 - i) % 8);
        const piece = "";
        const index = i;
        return {
            color, name, square, piece, index,
        };
    })
    );

    function handleSquareClick(name: string, square: number, index: number) {
        console.log("Square clicked: " + name + ", " + square + ", " + index);
        addPawn(index);
    }

    function addPawn(index: number) {
        setSquares(prev => 
            prev.map((sq, i) => 
                i === index ? {...sq, piece: "pawn"} : sq
            )
        );
    }

    return (
        <div className={styles.board}>
            {squares.map((sq) => (
                <Square
                    color= {sq.color}
                    name={sq.name}
                    square={sq.square}
                    piece={sq.piece}
                    index={sq.index}
                    onClick={() => handleSquareClick(sq.name, sq.square, sq.index)}
                />
            ))}
        </div>
    );
};

export default Board;