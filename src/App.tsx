import React from 'react';
import { DraggableWord } from './components/DraggableWord';
import { CloudBox } from './components/CloudBox';
import { ScoreBoard } from './components/ScoreBoard';
import { GameComplete } from './components/GameComplete';
import { LevelComplete } from './components/LevelComplete';
import { FeedbackToast } from './components/FeedbackToast';
import { BackgroundCharacter } from './components/BackgroundCharacter';
import { useGameState } from './hooks/useGameState';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getRandomizedWords } from './utils/wordUtils';

const WORDS_BY_LEVEL = {
  1: {
    correct: ['وسائل التواصل الاجتماعي', 'محركات البحث'],
    incorrect: ['أمطار', 'طعام'],
  },
  2: {
    correct: ['الشبكة العنكبوتية العالمية', 'مخزن المعلومات'],
    incorrect: ['تلفاز', 'ألعاب'],
  },
  3: {
    correct: ['البريد الإلكتروني', 'متصفح الإنترنت'],
    incorrect: ['حديقة', 'سيارة'],
  },
};

function App() {
  const { gameState, handleCorrectWord, handleWrongWord, handleContinueToNextLevel } = useGameState();
  const currentLevelWords = WORDS_BY_LEVEL[gameState.level as keyof typeof WORDS_BY_LEVEL];

  const handleDragStart = (e: React.DragEvent, word: string, isCorrect: boolean) => {
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.setData('isCorrect', isCorrect.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');
    const isCorrect = e.dataTransfer.getData('isCorrect') === 'true';

    if (isCorrect && !gameState.correctWords.includes(word)) {
      handleCorrectWord(word);
    } else {
      handleWrongWord();
    }
  };

  // Get randomized words for the current level
  const randomizedWords = React.useMemo(() => {
    return getRandomizedWords(
      currentLevelWords.correct,
      currentLevelWords.incorrect
    );
  }, [currentLevelWords, gameState.level]);

  // Split into left and right groups after randomization
  const midPoint = Math.ceil(randomizedWords.length / 2);
  const leftWords = randomizedWords.slice(0, midPoint);
  const rightWords = randomizedWords.slice(midPoint);

  return (
    <div className="h-screen bg-gradient-to-b from-background to-white flex flex-col overflow-hidden">
      <BackgroundCharacter />
      
      <FeedbackToast
        type={gameState.feedback.type || 'success'}
        message={gameState.feedback.message}
        isVisible={gameState.feedback.isVisible}
      />

      <AnimatePresence>
        {gameState.showLevelComplete && (
          <LevelComplete
            level={gameState.level - 1}
            score={gameState.score}
            onContinue={handleContinueToNextLevel}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col max-h-screen">
        <motion.div 
          className="text-center py-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="mb-8">
            <h1 className="game-title mb-6 flex items-center justify-center gap-6 text-4xl relative py-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="absolute w-full h-full"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-full bg-secondary/10 rounded-full blur-2xl" />
                </motion.div>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [-10, 0, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-10 h-10 text-secondary drop-shadow-lg" />
              </motion.div>
              <motion.span
                className="relative"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                لعبة تصنيف الكلمات
              </motion.span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [10, 0, -10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-10 h-10 text-secondary drop-shadow-lg" />
              </motion.div>
            </h1>
            <p className="text-xl text-accent/80 font-arabic">
              المستوى {gameState.level}: اسحب الكلمات المتعلقة بالإنترنت إلى السحابة
            </p>
          </div>

          <div className="flex justify-center items-center gap-8 mb-8">
            <ScoreBoard score={gameState.score} level={gameState.level} />
          </div>
        </motion.div>

        <div className="flex-1 flex justify-between items-center gap-4 px-4 min-h-0">
          <motion.div 
            className="flex flex-col gap-2 w-1/4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {leftWords.map(({ word, isCorrect }) => (
              !gameState.correctWords.includes(word) && (
                <DraggableWord
                  key={word}
                  word={word}
                  isCorrect={isCorrect}
                  onDragStart={handleDragStart}
                />
              )
            ))}
          </motion.div>

          <div className="flex-1 flex justify-center items-center max-h-full">
            <CloudBox
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              words={gameState.correctWords}
            />
          </div>

          <motion.div 
            className="flex flex-col gap-2 w-1/4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {rightWords.map(({ word, isCorrect }) => (
              !gameState.correctWords.includes(word) && (
                <DraggableWord
                  key={word}
                  word={word}
                  isCorrect={isCorrect}
                  onDragStart={handleDragStart}
                />
              )
            ))}
          </motion.div>
        </div>
      </div>

      {gameState.isGameComplete && <GameComplete score={gameState.score} />}
    </div>
  );
}

export default App;