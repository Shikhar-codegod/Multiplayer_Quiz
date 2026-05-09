import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import ThemeSelector from './components/ThemeSelector';
import GameMode from './components/GameMode';
import Lobby from './components/Lobby';
import QuizInterface from './components/QuizInterface';
import DynamicBackground from './components/DynamicBackground';

function App() {
  const [currentScreen, setCurrentScreen] = useState('theme'); // 'theme', 'mode', 'lobby', 'quiz'
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setCurrentScreen('mode');
  };

  const handleModeSelect = (mode) => {
    if (mode === 'multiplayer') {
      setCurrentScreen('lobby');
    }
  };

  const handleQuizReady = (data) => {
    setQuizData(data);
    setCurrentScreen('quiz');
  };

  const handleQuizEnd = (finalScore) => {
    // Return to lobby after game ends
    setCurrentScreen('lobby');
  };

  return (
    <>
      <DynamicBackground theme={selectedTheme} />
      <div className="app-container">
        <h1 style={{ fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 10px 0', textShadow: '0 0 20px rgba(255,255,255,0.2)', textAlign: 'center' }}>Five Elements</h1>
      {currentScreen !== 'quiz' && <p style={{ fontSize: '1.4rem', marginBottom: '2rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', textAlign: 'center' }}>Multiplayer Elemental Battle</p>}
      
      {/* AnimatePresence handles the fade in/out transitions between screens */}
      <AnimatePresence mode="wait">
        {currentScreen === 'theme' && (
          <ThemeSelector key="theme" onThemeSelect={handleThemeSelect} />
        )}
        
        {currentScreen === 'mode' && (
          <GameMode key="mode" onSelectMode={handleModeSelect} />
        )}
        
        {currentScreen === 'lobby' && (
          <Lobby key="lobby" onQuizReady={handleQuizReady} />
        )}
 
        {currentScreen === 'quiz' && (
          <QuizInterface key="quiz" quizData={quizData} onQuizEnd={handleQuizEnd} />
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

export default App;
