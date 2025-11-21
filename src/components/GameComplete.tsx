import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

export function GameComplete() {
  const { gameState, dispatch } = useGameContext();

  const handlePlayAgain = () => {
    dispatch({ type: 'START_GAME', payload: { mode: gameState.gameMode } });
  };

  const handleGoHome = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const getPerformanceMessage = () => {
    if (gameState.score >= 100) return 'أداء ممتاز! 🌟';
    if (gameState.score >= 50) return 'أداء جيد جداً! 👏';
    if (gameState.score >= 25) return 'أداء جيد! 👍';
    return 'يمكنك تحسين أدائك! 💪';
  };

  const getStarRating = () => {
    if (gameState.score >= 100) return 5;
    if (gameState.score >= 75) return 4;
    if (gameState.score >= 50) return 3;
    if (gameState.score >= 25) return 2;
    return 1;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Confetti
        colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
        numberOfPieces={200}
        recycle={false}
        gravity={0.3}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center max-w-2xl w-full border border-white/20"
      >
        {/* Trophy Animation */}
        <motion.div
          initial={{ y: -50, rotate: -180 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="mb-8"
        >
          <Trophy className="w-24 h-24 mx-auto text-yellow-400 drop-shadow-lg" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold text-white mb-6"
        >
          تهانينا! 🎉
        </motion.h1>

        {/* Performance Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-white/90 mb-8"
        >
          {getPerformanceMessage()}
        </motion.p>

        {/* Star Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mb-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <Star
                className={`w-12 h-12 ${
                  i < getStarRating() 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-400'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-8 border border-purple-500/30"
        >
          <div className="text-white/70 text-lg mb-2">النتيجة النهائية</div>
          <div className="text-4xl font-bold text-white">{gameState.score}</div>
          {gameState.streak > 0 && (
            <div className="text-purple-300 text-lg mt-2">
              أفضل سلسلة: {gameState.streak}
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            onClick={handlePlayAgain}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 
                     text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RotateCcw className="w-6 h-6" />
            العب مرة أخرى
          </motion.button>

          <motion.button
            onClick={handleGoHome}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 
                     text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="w-6 h-6" />
            الرئيسية
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full opacity-60"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}