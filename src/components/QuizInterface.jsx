import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';
import './QuizInterface.css';

const QuizInterface = ({ quizData, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Mock Players for mini-leaderboard
  const [players, setPlayers] = useState([
    { id: 1, name: 'You', score: 0 },
    { id: 2, name: 'Aarav_Fire', score: 0 }
  ]);

  if (!quizData || quizData.length === 0) {
    return <div>No quiz data available.</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10);
      setPlayers(prev => prev.map(p => p.name === 'You' ? { ...p, score: p.score + 10 } : p));
    } else {
      // Mock the opponent getting it right randomly sometimes
      if (Math.random() > 0.5) {
        setPlayers(prev => prev.map(p => p.name === 'Aarav_Fire' ? { ...p, score: p.score + 10 } : p));
      }
    }

    // Auto proceed after 2.5 seconds
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Quiz End
        alert(`Quiz Finished! Your score: ${isCorrect ? score + 10 : score}`);
        if (onQuizEnd) onQuizEnd(isCorrect ? score + 10 : score);
      }
    }, 2500);
  };

  return (
    <motion.div 
      className="quiz-interface-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quiz-header">
        <div className="question-counter glass-panel">
          Question {currentQuestionIndex + 1} / {quizData.length}
        </div>
        <div className="timer-badge glass-panel">
          <Clock size={20} />
          <span>15s</span> {/* Visual mock timer */}
        </div>
      </div>

      <div className="quiz-main-layout">
        <div className="quiz-content">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="question-card glass-panel"
            >
              <h2>{currentQuestion.question}</h2>
            </motion.div>
          </AnimatePresence>

          <div className="options-grid">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let optionClass = "option-btn glass-panel";
              if (isAnswered) {
                if (isCorrect) optionClass += " correct";
                else if (isSelected && !isCorrect) optionClass += " incorrect";
                else optionClass += " disabled";
              }

              return (
                <motion.button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleOptionClick(option)}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  disabled={isAnswered}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mini-leaderboard glass-panel">
          <h3><Trophy size={20} /> Live Scores</h3>
          <ul className="leaderboard-list">
            {players.sort((a, b) => b.score - a.score).map((player) => (
              <li key={player.id} className="leaderboard-item">
                <span className="player-name">{player.name}</span>
                <span className="player-score">{player.score} pts</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizInterface;
