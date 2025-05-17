import React, { useState } from "react";
import { IconButton, TextField, Button, Typography, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import "./../styles/Chatbot.css";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const sendMessage = async () => {
    if (chatInput.trim()) {
      const userMessage = { sender: "User", text: chatInput };
      setChatMessages([...chatMessages, userMessage]);
      setChatInput("");
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return (
    <div className="chatbot-container">
      <IconButton onClick={toggleChat} className="chat-icon" style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        <ChatIcon fontSize="large" style={{ color: "#00aaff", filter: "drop-shadow(0 0 10px #00aaff)" }} />
      </IconButton>

      {chatOpen && (
        <Paper className="chat-window" elevation={3} style={{ position: "fixed", bottom: 70, right: 20, width: "350px", maxHeight: "400px", display: "flex", flexDirection: "column", padding: "10px" }}>
          <div className="warning" style={{ textAlign: "center", color: "#ff4d4d", fontWeight: "bold", marginBottom: "10px", background: "#ffe6e6", padding: "4px 12px", borderRadius: "8px", fontSize: "0.875rem", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
            ⚠️ Hey, chatbot here. Just letting you know that my NBA knowledge is limited to 2021 and prior.
          </div>

          <div className="chat-messages" style={{ flexGrow: 1, overflowY: "auto", marginBottom: "10px" }}>
            {chatMessages.map((msg, index) => (
              <Typography 
                key={index} 
                className={msg.sender === "AI" ? "ai-message" : "user-message"}
                style={{ marginBottom: "5px" }}
              >
                {msg.text}
              </Typography>
            ))}

            {loading && (
              <Typography className="ai-message" style={{ fontStyle: "italic", color: "#888" }}>
                AI is typing...
              </Typography>
            )}
          </div>
          
          <div className="chat-input-container" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <TextField 
              fullWidth 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              placeholder="Ask about the draft..."
              variant="outlined"
              className="chat-input"
            />
            <Button onClick={sendMessage} variant="contained" className="send-button">Send</Button>
          </div>
          <Button onClick={clearChat} variant="outlined" className="clear-button" style={{ marginTop: "8px", width: "100%" }}>Clear Chat</Button>
        </Paper>
      )}
    </div>
  );
};

export default Chatbot;
