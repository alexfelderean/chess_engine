import React, {useState} from 'react';
import Board from '../Board/Board'
import StartButton from '../StartButton/StartButton';
import BoardManager from '../Board/BoardManager'

interface GameProps {
    manager: BoardManager;
}

function Game({manager} : GameProps) {
    let selected = -1;

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
    }));

    function handleStartButtonClick() {
        manager.setStartingPosition();
        renderBoard();
    }

    function handleSquareClick(index: number) {
        if(selected === -1) {
            selected = index;
        }
        else {
            manager.move(selected, index);
            renderBoard(); // triggers a re-render
        }
    }

    function renderBoard() {
        const board = manager.getBoard();
        setSquares(prev => 
            prev.map((sq, i) => ({
                ...sq, 
                piece: board[i],
            }))
        );
    }

    return (
        <div>
            <Board 
                squares={squares} 
                setSquares={setSquares} 
                handleSquareClick={handleSquareClick}/>
            
            <StartButton onClick={handleStartButtonClick}/>
        </div>
    );
    
    
}

export default Game;