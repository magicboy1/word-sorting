import { useState, useCallback, useEffect } from 'react';
import { GameState } from '../types/game';
import { useGameSounds } from './useGameSounds';

const POINTS_PER_CORRECT = 10;
const TOTAL_LEVELS = 3;
const WORDS_PER_LEVEL = {
  1: 2,
  2: 2,
  3: 2,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    correctWords: [],
    isGameComplete: false,
    showLevelComplete: false,
    feedback: {
      type: null,
      message: '',
      isVisible: false,
    },
  });

  const { playSound } = useGameSounds();

  useEffect(() => {
    if (gameState.feedback.isVisible) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          feedback: { ...prev.feedback, isVisible: false },
        }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.feedback.isVisible]);

  const handleCorrectWord = useCallback((word: string) => {
    setGameState(prev => {
      const newCorrectWords = [...prev.correctWords, word];
      const newScore = prev.score + POINTS_PER_CORRECT;
      const requiredWords = WORDS_PER_LEVEL[prev.level as keyof typeof WORDS_PER_LEVEL] || 2;
      const shouldAdvanceLevel = newCorrectWords.length >= requiredWords;
      const newLevel = shouldAdvanceLevel ? prev.level + 1 : prev.level;
      const isGameComplete = newLevel > TOTAL_LEVELS;

      playSound('correct');
      if (shouldAdvanceLevel && !isGameComplete) {
        playSound('levelUp');
      }

      return {
        ...prev,
        score: newScore,
        level: isGameComplete ? TOTAL_LEVELS : newLevel,
        correctWords: shouldAdvanceLevel ? [] : newCorrectWords,
        isGameComplete,
        showLevelComplete: shouldAdvanceLevel && !isGameComplete,
        feedback: {
          type: 'success',
          message: 'أحسنت! إجابة صحيحة',
          isVisible: true,
        },
      };
    });
  }, [playSound]);

  const handleWrongWord = useCallback(() => {
    playSound('wrong');
    setGameState(prev => ({
      ...prev,
      feedback: {
        type: 'error',
        message: 'حاول مرة أخرى',
        isVisible: true,
      },
    }));
  }, [playSound]);

  const handleContinueToNextLevel = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showLevelComplete: false,
    }));
  }, []);

  return {
    gameState,
    handleCorrectWord,
    handleWrongWord,
    handleContinueToNextLevel,
  };
}