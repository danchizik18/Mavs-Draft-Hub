import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Paper, Avatar } from "@mui/material";
import "../styles/PlayerProfile.css";

const PlayerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scoutingReports, setScoutingReports] = useState([]);
  const [newReport, setNewReport] = useState("");

  const addReport = () => {
    if (newReport.trim()) {
      setScoutingReports([...scoutingReports, newReport]);
      setNewReport("");
    }
  };

  return (
    <div className="player-profile-container">
      <div className="profile-header">
        <Avatar 
          src={`https://www.draftexpress.com/blue/images/headshots/1/${id}_750.jpg`} 
          alt={id} 
          className="profile-avatar" 
        />
        <Typography variant="h4" className="player-name">{id}'s Profile</Typography>
        <Button variant="outlined" onClick={() => navigate("/bigboard")} className="back-button">
          Back to Big Board
        </Button>
      </div>
      
      <Paper className="scouting-reports">
        <Typography variant="h5" gutterBottom>Scouting Reports</Typography>
        {scoutingReports.length > 0 ? (
          scoutingReports.map((report, index) => (
            <Typography key={index} className="report-item">- {report}</Typography>
          ))
        ) : (
          <Typography>No scouting reports yet.</Typography>
        )}
      </Paper>

      <TextField 
        label="New Scouting Report" 
        variant="outlined" 
        fullWidth 
        value={newReport}
        onChange={(e) => setNewReport(e.target.value)} 
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={addReport} className="add-report-button">Add Report</Button>
    </div>
  );
};

export default PlayerProfile;
