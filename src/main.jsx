import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import BigBoard from "./pages/BigBoard";
import PlayerProfile from "./pages/PlayerProfile";
import "./styles/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/big-board" element={<BigBoard />} />
        <Route path="/player/:id" element={<PlayerProfile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
