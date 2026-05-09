import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './ThemeSelector.css';

const themes = [
  { 
    id: 'agni', 
    name: 'FIRE', 
    vedicName: 'AGNI',
    description: 'The transformative power of fire, radiant and powerful. Ignites passion, digestion, and the vital spark of life.', 
    icon: '🔥',
    colors: ['#ff4500', '#ff8c00', '#ffff00']
  },
  { 
    id: 'jal', 
    name: 'WATER', 
    vedicName: 'JAL',
    description: 'The fluid essence of existence. Governs emotions, adaptability, and the continuous flow of consciousness.', 
    icon: '💧',
    colors: ['#00bfff', '#87cefa', '#ffffff']
  },
  { 
    id: 'prithvi', 
    name: 'EARTH', 
    vedicName: 'PRITHVI',
    description: 'The solid foundation of nature. Represents stability, grounding, structure, and physical endurance.', 
    icon: '🌿',
    colors: ['#228b22', '#8b4513', '#deb887']
  },
  { 
    id: 'vaayu', 
    name: 'AIR', 
    vedicName: 'VAAYU',
    description: 'The breath of the cosmos. Embodies movement, thought, lightness, and the vital currents of breath (Prana).', 
    icon: '💨',
    colors: ['#f0f8ff', '#e0ffff', '#ffffff']
  },
  { 
    id: 'akash', 
    name: 'SPACE', 
    vedicName: 'AKASH',
    description: 'The infinite void. The subtle ether that holds all other elements, representing expansiveness, sound, and cosmic connection.', 
    icon: '✨',
    colors: ['#8a2be2', '#dda0dd', '#ffffff']
  },
];

const ThemeSelector = ({ onThemeSelect }) => {
  const [hoveredTheme, setHoveredTheme] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleThemeChange = (themeId) => {
    document.documentElement.setAttribute('data-theme', themeId);
    if (onThemeSelect) onThemeSelect(themeId);
  };

  const getParticleOptions = (themeId, isHovered) => {
    const theme = themes.find(t => t.id === themeId);
    const speedMultiplier = isHovered ? 2 : 0.5;
    
    let options = {
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        color: { value: theme.colors },
        links: { enable: false },
        move: { enable: true, speed: 2 * speedMultiplier },
        number: { density: { enable: true, area: 400 }, value: isHovered ? 150 : 80 },
        opacity: { value: { min: 0.3, max: 0.8 } },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } }
      },
      detectRetina: true
    };

    if (themeId === 'agni') {
      options.particles.move.direction = "top";
      options.particles.shape.type = ["circle", "triangle"];
      options.particles.size.value = { min: 1, max: 6 };
    } else if (themeId === 'jal') {
      options.particles.move.direction = "top"; // bubbles rise
      options.particles.size.value = { min: 2, max: 6 };
      options.particles.move.speed = 1.5 * speedMultiplier;
    } else if (themeId === 'vaayu') {
      options.particles.move.direction = "right";
      options.particles.move.straight = false;
      options.particles.opacity.value = { min: 0.1, max: 0.4 };
      options.particles.size.value = { min: 1, max: 10 }; // larger mist particles
    } else if (themeId === 'prithvi') {
      options.particles.move.direction = "bottom";
      options.particles.shape.type = ["circle", "polygon"];
      options.particles.move.speed = 1 * speedMultiplier;
    } else if (themeId === 'akash') {
      options.particles.move.direction = "none";
      options.particles.size.value = { min: 0.5, max: 2 };
      options.particles.opacity.animation = { enable: true, speed: 1, sync: false };
      options.particles.number.value = isHovered ? 200 : 100;
    }

    return options;
  };

  return (
    <div className="theme-selector-container">
      <motion.div 
        className="ts-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="ts-subheader" style={{ fontSize: '1.2rem', letterSpacing: '2px', opacity: 0.9, fontWeight: 'bold' }}>SELECT ONE THEME</p>
      </motion.div>
      
      <div className="theme-stack">
        {themes.map((theme, index) => {
          const isHovered = hoveredTheme === theme.id;
          
          return (
            <motion.div
              key={theme.id}
              className={`theme-panel theme-${theme.id}`}
              onClick={() => handleThemeChange(theme.id)}
              onMouseEnter={() => setHoveredTheme(theme.id)}
              onMouseLeave={() => setHoveredTheme(null)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="element-bg-gradient"></div>
              
              {init && (
                <Particles
                  id={`particles-${theme.id}`}
                  options={getParticleOptions(theme.id, isHovered)}
                  className="element-particles-bg"
                />
              )}
              
              <div className="panel-content-glass">
                <div className="panel-col-left">
                  <span className="element-icon">{theme.icon}</span>
                  <h3>{theme.name}</h3>
                  <span className="vedic-name">{theme.vedicName}</span>
                </div>
                
                <div className="panel-divider"></div>
                
                <div className="panel-col-right">
                  <p className="element-desc">{theme.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
