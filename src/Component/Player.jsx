import { useState } from "react";

export default function Player({name, symbol}){
  const[isEditing, setIsEditing] = useState(false);
  function whenClick(){
    setIsEditing(true);
  }
  let playerName = <span className = "player-name ">
              {name}
            </span>;
  if (isEditing){
    playerName = <input type = "text" required />;
  }
  
    return(
<li>
  
            <span className = "player"></span>
            {playerName}
            <span className = "player-name ">
              {name}
            </span>
            <span className = "player-symbol">
              {symbol}
            </span>
            <button onClick = {whenClick}> Edit</button>
            </li>
    );
}