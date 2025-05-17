import React, { useState } from "react";
import { IconButton, TextField, Button, Typography, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import "./../styles/Chatbot.css";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const sendMessage = async () => {
    if (chatInput.trim()) {
      const userMessage = { sender: "User", text: chatInput };
      setChatMessages([...chatMessages, userMessage]);
      setChatInput("");

      try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: chatInput }],
          max_tokens: 100,
          temperature: 0.7
        }, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          }
        });

        const aiResponseText = response.data.choices[0]?.message?.content.trim() || "I'm sorry, I couldn't understand that.";
        const aiResponse = { sender: "AI", text: aiResponseText };
        setChatMessages(prev => [...prev, aiResponse]);

      } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        setChatMessages(prev => [...prev, { sender: "AI", text: "Error: Unable to connect to AI." }]);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="warning" style={{ textAlign: "center", color: "#ff4d4d", fontWeight: "bold", marginBottom: "10px", background: "#ffe6e6", padding: "8px 16px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        ⚠️ Hey, chatbot here. Just letting you know that my NBA knowledge is limited to 2021 and prior. 
      </div>

      <IconButton onClick={toggleChat} className="chat-icon" style={{ position: "fixed", bottom: 20, right: 20 }}>
        <ChatIcon fontSize="large" />
      </IconButton>

      {chatOpen && (
        <Paper className="chat-window" elevation={3}>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <Typography key={index} className={msg.sender === "AI" ? "ai-message" : "user-message"}>{msg.text}</Typography>
            ))}
          </div>
          <TextField 
            fullWidth 
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            placeholder="Ask about the draft..."
            variant="outlined"
          />
          <Button onClick={sendMessage} variant="contained" className="send-button">Send</Button>
        </Paper>
      )}
    </div>
  );
};

export default Chatbot;
