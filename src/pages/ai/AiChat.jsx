import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import './ai.css';
import { BASE_URL } from '../../../globals';

function AiChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Send to your backend route (Node/Express) which calls OpenAI API
      const res = await fetch(`${BASE_URL}/ai-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Add AI response
      const aiMessage = { sender: "ai", text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error connecting to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="row">
        <h2>Projina AI</h2>
      </div>
      <div className="chat">
        <div className="ai-chat">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender === "user" ? "user" : "ai"}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="message ai">Typing...</div>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-el">
            <input
              type="text"
              placeholder="Enter your question..."
              className="ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AiChat;
