import React, {useRef} from 'react';
import './App.css';
import Game from './components/Game/Game'
import BoardManager from './components/Board/BoardManager';

function App() {
  const boardManagerRef = useRef(new BoardManager());
  return (
    <div className="App">
      <header className="App-header">
        <Game manager={boardManagerRef.current}/>
      </header>
      
    </div>
  );
}

export default App;
