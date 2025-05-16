import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import playersData from "../data/intern_project_data.json";
import "./../styles/BigBoard.css";

const BigBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(playersData.bio);
  }, []);

  return (
    <div className="container big-board">
      <h2>Big Board</h2>
      <ul>
        {players.map((player) => (
          <li key={player.playerId}>
            <Link to={`/player/${player.playerId}`}>
              {player.name} - {player.currentTeam}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BigBoard;
