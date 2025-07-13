import React, {useState} from 'react';
import styles from './Board.module.css'
import Square from './../Square/Square'
import BoardManager from './BoardManager'

interface SquareType {
    color: string;
    name: string;
    square: number;
    piece: string;
    index: number
}

interface BoardProps {
    squares: SquareType[];
    setSquares: React.Dispatch<React.SetStateAction<SquareType[]>>;
    handleSquareClick: (index: number) => void;
}

function Board({squares, setSquares, handleSquareClick}: BoardProps) {

    const [needsRender, setNeedsRender] = useState(false);

    return (
        <div className={styles.board}>
            {squares.map((sq) => (
                <Square
                    color= {sq.color}
                    name={sq.name}
                    square={sq.square}
                    piece={sq.piece}
                    index={sq.index}
                    onClick={() => handleSquareClick(sq.index)}
                />
            ))}
        </div>
    );
};

export default Board;