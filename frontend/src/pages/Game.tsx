import React, {useState, useRef} from 'react';
import Board from '../components/Board/Board'
import StartButton from '../components/StartButton/StartButton';
import BoardManager from '../logic/BoardManager'

interface GameProps {
    manager: BoardManager;
}

function Game({manager} : GameProps) {
    let selected = useRef(-1);

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const [squares, setSquares] = useState(
        Array.from({length: 64}, (_, i) => {
        const color = ((Math.floor(i % 8) + Math.floor(i / 8)) % 2 === 0) ? "white" : "black"
        const piece = "";
        const index = i;
        const highlight = false;
        return {
            color, piece, index, highlight
        };
    }));

    function handleStartButtonClick() {
        manager.setStartingPosition();
        renderBoard();
    }

    async function handleSquareClick(index: number) {
        if(selected.current === -1) {
            if(manager.addHighlights(index) > 0) {
                selected.current = index;
                manager.addHighlights(index);
                renderBoard();
            }
        }
        else {
            if(manager.isValidMove(selected.current, index)) {
                manager.makeUserMove(selected.current, index);
                await manager.makeComputerMove();
            }
            manager.removeHighlights(selected.current);
            selected.current = -1;
            renderBoard(); // triggers a re-render
        }
    }

    function renderBoard() {
        const board = manager.board;
        const highlights = manager.highlights;
        setSquares(prev => 
            prev.map((sq, i) => ({
                ...sq, 
                piece: board[i],
                highlight: highlights[i],
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