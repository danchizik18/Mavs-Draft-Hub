import React from "react";
import { useParams } from "react-router-dom";
import playersData from "../data/intern_project_data.json";
import "./../styles/PlayerProfile.css";

const PlayerProfile = () => {
  const { id } = useParams();
  const player = playersData.bio.find((p) => p.playerId === parseInt(id));

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div className="container player-profile">
      <h2>{player.name} Profile</h2>
      <img src={player.photoUrl} alt={player.name} />
      <p>Team: {player.currentTeam}</p>
      <p>Height: {player.height} inches</p>
      <p>Weight: {player.weight} lbs</p>
      <p>Nationality: {player.nationality}</p>
      <p>High School: {player.highSchool || "N/A"}</p>
    </div>
  );
};

export default PlayerProfile;
