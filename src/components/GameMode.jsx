import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import './GameMode.css';

const GameMode = ({ onSelectMode }) => {
  return (
    <motion.div 
      className="game-mode-container"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Multiplayer Battle
      </motion.h2>
      <div className="mode-options">
        <motion.button 
          className="mode-card glass-panel"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectMode('multiplayer')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Users size={48} className="mode-icon" />
          <h3>Play with Friends</h3>
          <p>Host a multiplayer battle</p>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameMode;
