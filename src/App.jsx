import { useState } from "react";
import Player from './Component/Player.jsx';
import GameBoard from './Component/GameBoard.jsx';
import Log from './Component/Log.jsx';
function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurn, setGameTurn] = useState([]);
  function handleSelectedSquare(rowIndex, colIndex ){
    setActivePlayer((curActive) => curActive === 'X' ? 'O' : 'X');
    setGameTurn((prevTurn) => {
      let currentPlayer = 'X';
      if  (prevTurn.length > 0 && prevTurn[0] === 'X'){
        currentPlayer = 'O';
      };
      const updatedTurn = [
        {square : {row : rowIndex, col : colIndex}, player : currentPlayer}, ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  return (
   <main>
    <div id ="game-container">
      <ol id ="players" className = "highlight-player" >
        <Player name= "Player 1" symbol = "X" isActive={activePlayer === 'X'}/>
        <Player name= "Player 2" symbol = "O" isActive={activePlayer === 'O'}/>
      </ol>
      <GameBoard onSelectSquare = {handleSelectedSquare} turns = {gameTurn}/>
    </div>
    <Log />
   </main>
  )
}

export default App
