import React, {useRef} from 'react';
import './App.css';
import Game from './pages/Game';
import BoardManager from './logic/BoardManager';

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
