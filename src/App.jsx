import { useState } from "react";
import Player from './Component/Player.jsx';
import GameBoard from './Component/GameBoard.jsx';
import Log from './Component/Log.jsx';
import {WINNING_COMBINATIONS} from './winning-combination.js';
import GameOver from './Component/GameOver.jsx'
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deActivePlayer(gameTurn){
  let currentPlayer = 'X';
      if (gameTurn.length > 0 && gameTurn[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}
export default function App() {
  const [Players, setPlayers] = useState({
    X : "Players 1",
    O : "Players 2",
  })
  const [gameTurn, setGameTurn] = useState([]);
   const activePlayer = deActivePlayer(gameTurn);
   let gameBoard = [...initialGameBoard.map(array => [...array])];
    for (const  turn of gameTurn){ 
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard [row] [col] = player;


    }
    let winner = null;
  //const [activePlayer, setActivePlayer] = useState("X");
  for (const combination of WINNING_COMBINATIONS ){
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].col];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
      {
      winner = Players[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurn.length === 9 && !winner;
  
  function handleSelectedSquare(rowIndex, colIndex ){
   
    //setActivePlayer((curActive) => curActive === 'X' ? 'O' : 'X');
    setGameTurn((prevTurn) => {
     const currentPlayer = deActivePlayer(prevTurn);
      const updatedTurn = [
        {square : {row : rowIndex, col : colIndex}, player : currentPlayer}, ...prevTurn,
      ];
      return updatedTurn;
    });
  }
  function handlePlayerChange(symbol, newName){
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName,

      };
    });
  }
  function handleRematch(){
    setGameTurn([]);
  }

  return (
   <main>
    <div id ="game-container">
      <ol id ="players" className = "highlight-player" >
        <Player name= "Player 1" symbol = "X" isActive={activePlayer === 'X'} onChangeName = {handlePlayerChange}/>
        <Player name= "Player 2" symbol = "O" isActive={activePlayer === 'O'} onChangeName = {handlePlayerChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner = {winner} onRematch={handleRematch} />}
      <GameBoard onSelectSquare = {handleSelectedSquare} board = {gameBoard}/>
    </div>
    <Log turns = {gameTurn}/>
   </main>
   
  )
}


