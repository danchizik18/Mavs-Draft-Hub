// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import mavsLogo from "../assets/mavs_logo.png";
import "../styles/NavBar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link to="/">
          <img src={mavsLogo} alt="Mavericks Logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="navbar-title">Mavericks Draft Hub</Link>
      </div>
    </div>
  );
};

export default Navbar;
