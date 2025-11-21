import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameContext } from '../contexts/GameContext';
import { GameHeader } from './GameHeader';
import { WordCard } from './WordCard';
import { DropZone } from './DropZone';
import { PowerUpBar } from './PowerUpBar';
import { FeedbackToast } from './FeedbackToast';
import { GameComplete } from './GameComplete';

export function GameScreen() {
  const { gameState, dispatch } = useGameContext();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (gameState.isGameActive && gameState.gameMode === 'timed') {
      timerRef.current = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.isGameActive, gameState.gameMode, dispatch]);

  useEffect(() => {
    if (gameState.feedback.isVisible) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_FEEDBACK' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.feedback.isVisible, dispatch]);

  const handleWordDrop = (word: string, isCorrect: boolean) => {
    if (isCorrect) {
      dispatch({ type: 'CORRECT_WORD', payload: word });
    } else {
      dispatch({ type: 'WRONG_WORD' });
    }
  };

  const availableWords = gameState.currentWords.filter(
    word => !gameState.correctWords.includes(word.text)
  );

  const correctCategoryWords = availableWords.filter(
    word => word.category === gameState.selectedCategory
  );

  if (gameState.screen === 'complete') {
    return <GameComplete />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader />
      
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <PowerUpBar />
        
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Words */}
            <motion.div 
              className="space-y-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {availableWords.slice(0, Math.ceil(availableWords.length / 2)).map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WordCard 
                    word={word} 
                    onDrop={handleWordDrop}
                    isCorrect={word.category === gameState.selectedCategory}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Center Drop Zone */}
            <div className="flex justify-center">
              <DropZone 
                category={gameState.selectedCategory}
                correctWords={gameState.correctWords}
                onDrop={handleWordDrop}
              />
            </div>

            {/* Right Words */}
            <motion.div 
              className="space-y-4"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {availableWords.slice(Math.ceil(availableWords.length / 2)).map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WordCard 
                    word={word} 
                    onDrop={handleWordDrop}
                    isCorrect={word.category === gameState.selectedCategory}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="mt-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-white/70 text-lg mb-2">
            الكلمات الصحيحة: {gameState.correctWords.length} / {correctCategoryWords.length}
          </div>
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(gameState.correctWords.length / correctCategoryWords.length) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>

      <FeedbackToast />
    </div>
  );
}