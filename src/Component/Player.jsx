import { useState } from "react";

export default function Player({ name, symbol }) {
  const [editName, setEditName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(event) {
    setEditName(event.target.value);
  }

  function whenClick() {
    setIsEditing(!isEditing);
  }

  let playerName = (
    <span className="player-name">
      {editName}
    </span>
  );

  if (isEditing) {
    playerName = (
      <input
        type="text"
        required
        value={editName}
        onChange={handleChange}
      />
    );
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">
          {symbol}
        </span>
      </span>

      <button onClick={whenClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}