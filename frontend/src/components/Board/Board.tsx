import React, {useState} from 'react';
import styles from './Board.module.css'
import Square from './../Square/Square'
import BoardManager from '../../logic/BoardManager'

interface SquareType {
    color: string;
    piece: string;
    index: number;
    highlight: boolean;
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
                    piece={sq.piece}
                    index={sq.index}
                    highlight={sq.highlight}
                    onClick={() => handleSquareClick(sq.index)}
                />
            ))}
        </div>
    );
};

export default Board;