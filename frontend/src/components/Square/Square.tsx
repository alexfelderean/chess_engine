import React, {useState} from 'react';
import styles from './Square.module.css'

interface SquareProps {
    color: string;
    piece: string;
    index: number;
    highlight: boolean;
    onClick: () => void;
}

const img_map: Record<string, string> = {
    'p': 'bp',
    'P': 'wp',
    'r': 'br',
    'R': 'wr',
    'n': 'bn',
    'N': 'wn',
    'q': 'bq',
    'Q': 'wq',
    'k': 'bk',
    'K': 'wk',
    'b': 'bb',
    'B': 'wb'
};

function Square({color, piece, index, highlight, onClick}: SquareProps) {
    const [sqPiece, setSqPiece] = useState(piece);

    return (
        <div className={styles[`${color}_square`]} onClick={() => onClick()}>
            {highlight && <div className={styles.dot} />}
            {piece!=="" && <img src={img_map[piece] + '.png'}/>}
        </div>
    );
}

export default React.memo(Square);