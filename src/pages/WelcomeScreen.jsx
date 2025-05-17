import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/WelcomeScreen.css";
import mavsLogo from "../assets/mavs_logo.png";
import dirkImage from "../assets/dirk_nowitzki.png";
import terryImage from "../assets/jason_terry.png";
import kiddImage from "../assets/jason_kidd.png";

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <div className="navbar">
        <img src={mavsLogo} alt="Mavericks Logo" className="navbar-logo" />
        <h2>Mavericks Draft Hub</h2>
      </div>

      <div className="legend-animations">
        <motion.img src={dirkImage} alt="Dirk Nowitzki" className="legend-image" initial={{ x: "-50vw" }} animate={{ x: "0" }} transition={{ duration: 3, ease: "easeOut" }} />
        <motion.img src={terryImage} alt="Terry Image" className="legend-image" initial={{ x: "50vw" }} animate={{ x: "10vw" }} transition={{ duration: 3, ease: "easeOut" }} />
        <motion.img src={kiddImage} alt="Jason Kidd" className="legend-image" initial={{ x: "-50vw" }} animate={{ x: "0" }} transition={{ duration: 3, ease: "easeOut" }} />
      </div>

      <motion.h1
        className="welcome-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Welcome to Mavericks Draft Hub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Explore the Draft Big Board and Player Profiles
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Link to="/bigboard">
          <button className="explore-button">Explore Draft Hub</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
