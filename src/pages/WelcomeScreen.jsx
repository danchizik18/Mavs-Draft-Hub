import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/WelcomeScreen.css";
import dirkVideo from "../assets/dirk_fadeaway.mp4";

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <div className="video-container">
        <video autoPlay muted loop className="dirk-video">
          <source src={dirkVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <motion.h1
        className="welcome-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Welcome to Mavericks Draft Hub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Explore the Draft Big Board and Player Profiles
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <Link to="/bigboard">
          <button className="explore-button">Explore Draft Hub</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
