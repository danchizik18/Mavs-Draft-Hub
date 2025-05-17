import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/WelcomeScreen.css";
import dirkVideo from "../assets/dirk_fadeaway.mp4";

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen" style={{ paddingTop: "40px" }}>
      <div className="video-container" style={{ marginTop: "-40px" }}>
        <video autoPlay muted loop className="dirk-video">
          <source src={dirkVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <motion.h1
        className="welcome-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          background: "linear-gradient(90deg, #1d428a, #007ac1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "4rem",
          fontWeight: "bold",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
          display: "inline-block",
          whiteSpace: "pre-wrap"
        }}
      >
        {"Welcome to the Mavericks Draft Hub".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ color: "#ffffff", textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)" }}
      >
        The Future Starts Here.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <Link to="/bigboard">
          <button className="explore-button">Show me the prospects!</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
