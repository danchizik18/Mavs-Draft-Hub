import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Avatar,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  TableSortLabel,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "../styles/BigBoard.css";

const BigBoard = () => {
  const [players, setPlayers] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const navigate = useNavigate();

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filter, minValue, maxValue]);

  const loadPlayers = async () => {
    try {
      const csvModules = import.meta.glob("/src/data/players.csv", { as: "raw" });
      const csvPaths = Object.keys(csvModules);
      if (csvPaths.length === 0) throw new Error("CSV file not found.");

      const csvText = await csvModules[csvPaths[0]]();
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const cleanedPlayers = result.data.filter(player => player.name?.trim());
          setPlayers(cleanedPlayers);
          setDisplayedPlayers(cleanedPlayers);
        },
      });
    } catch (err) {
      setError("Failed to load player data.");
    }
  };

  const applyFilters = () => {
    let filtered = [...players];
    if (search.trim()) {
      filtered = filtered.filter(player =>
        player.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter) {
      filtered = filtered.filter(player => {
        const value = parseFloat(player[filter]);
        if (isNaN(value)) return true;
        if (minValue && value < parseFloat(minValue)) return false;
        if (maxValue && value > parseFloat(maxValue)) return false;
        return true;
      });
    }

    setDisplayedPlayers(filtered);
  };

  const resetFilters = () => {
    setSearch("");
    setFilter("");
    setMinValue("");
    setMaxValue("");
    setDisplayedPlayers(players);
  };

  const toggleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sorted = [...displayedPlayers].sort((a, b) => {
      const valueA = parseFloat(a[key]) || 0;
      const valueB = parseFloat(b[key]) || 0;
      return direction === "asc" ? valueA - valueB : valueB - valueA;
    });

    setDisplayedPlayers(sorted);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
    }
    return null;
  };

  const navigateToProfile = (player) => {
    navigate(`/player/${player.name}`);
  };

  return (
    <div className="big-board-container">
      <div className="header-controls">
        <Typography variant="h4" gutterBottom>Mavericks Draft Hub - Big Board</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>Back to Home</Button>
      </div>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Search Players"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <div className="filter-controls">
        <FormControl>
          <InputLabel>Filter by Metric</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="height">Height</MenuItem>
            <MenuItem value="weight (lbs)">Weight (lbs)</MenuItem>
            <MenuItem value="agility (s)">Agility (s)</MenuItem>
            <MenuItem value="sprint (s)">Sprint (s)</MenuItem>
            <MenuItem value="ESPN Rank">ESPN Rank</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Min Value" value={minValue} onChange={(e) => setMinValue(e.target.value)} />
        <TextField label="Max Value" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
        <Button onClick={resetFilters}>RESET FILTERS</Button>
      </div>

      <TableContainer component={Paper} className="big-board-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell onClick={() => toggleSort("name")}>Name {getSortIcon("name")}</TableCell>
              <TableCell>Team</TableCell>
              <TableCell onClick={() => toggleSort("ESPN Rank")}>ESPN Rank {getSortIcon("ESPN Rank")}</TableCell>
              <TableCell onClick={() => toggleSort("height")}>Height {getSortIcon("height")}</TableCell>
              <TableCell onClick={() => toggleSort("weight (lbs)")}>Weight (lbs) {getSortIcon("weight (lbs)")}</TableCell>
              <TableCell onClick={() => toggleSort("agility (s)")}>Agility (s) {getSortIcon("agility (s)")}</TableCell>
              <TableCell>Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedPlayers.map((player, index) => (
              <TableRow key={index}>
                <TableCell><Avatar src={player.photoUrl} alt={player.name} /></TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.currentTeam}</TableCell>
                <TableCell>{player["ESPN Rank"]}</TableCell>
                <TableCell>{player.height}</TableCell>
                <TableCell>{player["weight (lbs)"]}</TableCell>
                <TableCell>{player["agility (s)"]}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigateToProfile(player)}
                  >
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BigBoard;
