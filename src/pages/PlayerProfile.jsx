import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Paper, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Papa from "papaparse";
import "../styles/PlayerProfile.css";

const PlayerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [scoutingReports, setScoutingReports] = useState([]);
  const [newReport, setNewReport] = useState("");

  useEffect(() => {
    loadPlayerData();
  }, []);

  const loadPlayerData = async () => {
    const csvModules = import.meta.glob("/src/data/players.csv", { as: "raw" });
    const csvPaths = Object.keys(csvModules);
    if (csvPaths.length === 0) return;

    const csvText = await csvModules[csvPaths[0]]();
    Papa.parse(csvText, {
      header: true,
      complete: (result) => {
        const playerData = result.data.find(p => p.name.toLowerCase() === id.toLowerCase());
        if (playerData) {
          setPlayer(playerData);
        }
      }
    });
  };

  const addReport = () => {
    if (newReport.trim()) {
      setScoutingReports([...scoutingReports, newReport]);
      setNewReport("");
    }
  };

  if (!player) return <Typography>Loading...</Typography>;

  return (
    <div className="player-profile-container">
      <div className="profile-header">
        <Avatar src={player.photoUrl} alt={player.name} className="profile-avatar" />
        <Typography variant="h4" className="player-name">{player.name}'s Profile</Typography>

        <Button variant="outlined" onClick={() => navigate("/bigboard")} className="back-button">Back to Big Board</Button>
      </div>

      <TableContainer component={Paper} className="player-info">
        <Table>
          <TableHead>
            <TableRow><TableCell colSpan={2}>Player Information</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(player).map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{player[key] || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
