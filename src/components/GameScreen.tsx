import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';
import { useGameSounds } from '../hooks/useGameSounds';

export function GameScreen() {
  const { gameState, dispatch } = useGameContext();
  const { playCorrect, playWrong } = useGameSounds();

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  useEffect(() => {
    if (gameState.feedback.isVisible) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_FEEDBACK' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.feedback.isVisible, dispatch]);

  const handleSelectAnswer = (choiceId: string) => {
    if (gameState.showFeedback) return;
    dispatch({ type: 'SELECT_ANSWER', payload: choiceId });
  };

  const handleSubmit = () => {
    if (!gameState.selectedAnswer || gameState.showFeedback) return;

    dispatch({ type: 'SUBMIT_ANSWER' });

    const selectedChoice = currentQuestion.choices.find(
      choice => choice.id === gameState.selectedAnswer
    );

    if (selectedChoice?.isCorrect) {
      playCorrect();
    } else {
      playWrong();
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  return (
    <div className="min-h-screen flex flex-col p-8">
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <img
            src="/image.png"
            alt="Superhero"
            className="w-24 h-24 object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center flex-1"
        >
          <h1 className="text-4xl font-bold text-emerald-700">
            في أمان السوشيال ميديا
          </h1>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg flex items-center gap-2"
        >
          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-bold text-emerald-700">{gameState.score}</span>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameState.currentQuestionIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-emerald-700 mb-4">
                  {currentQuestion.tip}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full" />
              </div>

              <p className="text-2xl text-gray-800 text-center font-medium leading-relaxed">
                {currentQuestion.question}
              </p>

              <motion.div
                className="flex justify-center mt-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-emerald-500">
                  <path
                    d="M30 10 L30 50 M25 45 L30 50 L35 45"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentQuestion.choices.map((choice, index) => {
                const isSelected = gameState.selectedAnswer === choice.id;
                const showResult = gameState.showFeedback;
                const isCorrectChoice = choice.isCorrect;
                const isWrongSelection = showResult && isSelected && !isCorrectChoice;

                let bgColor = 'bg-white/80';
                if (showResult) {
                  if (isCorrectChoice) {
                    bgColor = 'bg-emerald-500';
                  } else if (isWrongSelection) {
                    bgColor = 'bg-red-500';
                  }
                } else if (isSelected) {
                  bgColor = 'bg-blue-400';
                }

                return (
                  <motion.button
                    key={choice.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={!showResult ? { scale: 1.02, y: -3 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleSelectAnswer(choice.id)}
                    disabled={showResult}
                    className={`${bgColor} backdrop-blur-sm rounded-2xl p-6 shadow-lg
                               transition-all duration-300 border-4
                               ${isSelected ? 'border-emerald-600' : 'border-white/50'}
                               ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
                  >
                    <span className={`text-xl font-bold ${
                      showResult && (isCorrectChoice || isWrongSelection) ? 'text-white' : 'text-gray-800'
                    }`}>
                      {choice.text}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {!gameState.showFeedback && gameState.selectedAnswer && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-4 rounded-2xl
                           font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300
                           hover:scale-105 border-4 border-white"
                >
                  تأكيد الإجابة
                </button>
              </motion.div>
            )}

            {gameState.showFeedback && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-12 py-4 rounded-2xl
                           font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300
                           hover:scale-105 border-4 border-white flex items-center gap-3"
                >
                  <span>السؤال التالي</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center mt-8">
        <div className="text-gray-700 text-lg font-medium mb-2">
          السؤال {gameState.currentQuestionIndex + 1} من {gameState.totalQuestions}
        </div>
        <div className="max-w-md mx-auto bg-white/50 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            initial={{ width: 0 }}
            animate={{
              width: `${((gameState.currentQuestionIndex + 1) / gameState.totalQuestions) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence>
        {gameState.feedback.isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className={`px-8 py-4 rounded-2xl shadow-2xl text-white font-bold text-xl
                           ${gameState.feedback.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {gameState.feedback.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
