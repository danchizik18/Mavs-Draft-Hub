import React from "react";
import { Link } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <div className="container">
      <h1>Mavericks Draft Hub</h1>
      <Link to="/big-board">Go to Big Board</Link>
    </div>
  );
}

export default App;
