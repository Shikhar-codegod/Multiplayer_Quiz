import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Users, Send, Sparkles } from 'lucide-react';
import './Lobby.css';
import { generateQuiz } from '../services/aiService';

const Lobby = ({ onQuizReady }) => {
  const [players] = useState([
    { id: 1, name: 'You (Host)', role: 'host' },
    { id: 2, name: 'Aarav_Fire', role: 'player' }
  ]);
  const MAX_PLAYERS = 10;
  const roomCode = 'AGNI-9482';

  // Chat State
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to the Elemental Lobby!', isSystem: true },
    { id: 2, sender: 'Aarav_Fire', text: 'Hey! Ready when you are.', isSystem: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Host Controls State
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    alert('Room code copied to clipboard!');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'You (Host)', text: newMessage, isSystem: false }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic first!');
      return;
    }
    setIsGenerating(true);
    
    try {
      const quizData = await generateQuiz(topic);
      if (onQuizReady) onQuizReady(quizData);
    } catch (error) {
      console.error(error);
      alert('Failed to generate quiz. Check API key and try again.');
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <motion.div 
        className="generating-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="magic-icon"
        >
          <Sparkles size={80} />
        </motion.div>
        
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Generating "{topic}" Quiz...
        </motion.h2>
        <p>Summoning the elemental knowledge...</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="lobby-layout"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="lobby-main">
        <h2>Waiting Lobby</h2>
        
        <div className="room-info glass-panel">
          <p>Room Code</p>
          <div className="code-display">
            <h1>{roomCode}</h1>
            <button className="copy-btn" onClick={copyToClipboard} title="Copy Room Code">
              <Copy size={20} />
            </button>
          </div>
        </div>

        {/* Host Controls */}
        <div className="host-controls glass-panel">
          <h3>Host Controls</h3>
          <div className="topic-input-group">
            <input 
              type="text" 
              placeholder="Enter Quiz Topic (e.g., Indian History, Science, Bollywood)" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="topic-input"
            />
          </div>
          
          <motion.button 
            className="btn-primary start-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateQuiz}
          >
            <Sparkles size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Generate Quiz
          </motion.button>
        </div>

        <div className="players-section glass-panel">
          <div className="players-header">
            <h3><Users size={24} /> Players Joined</h3>
            <span className="player-count">{players.length} / {MAX_PLAYERS}</span>
          </div>
          
          <ul className="players-list">
            {players.map((player, idx) => (
              <motion.li 
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="player-item"
              >
                <div className="player-avatar">
                  {player.name.charAt(0)}
                </div>
                <span>{player.name} {player.role === 'host' && '👑'}</span>
              </motion.li>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: MAX_PLAYERS - players.length }).map((_, index) => (
              <li key={`empty-${index}`} className="player-item empty-slot">
                <div className="player-avatar empty">?</div>
                <span>Waiting...</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Section */}
      <div className="lobby-sidebar glass-panel">
        <div className="chat-header">
          <h3>Lobby Chat</h3>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.isSystem ? 'system-msg' : ''} ${msg.sender === 'You (Host)' ? 'own-msg' : ''}`}>
              {!msg.isSystem && <span className="msg-sender">{msg.sender}</span>}
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Lobby;
