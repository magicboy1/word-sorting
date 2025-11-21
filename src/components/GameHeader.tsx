import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Trophy, Zap, Home } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

export function GameHeader() {
  const { gameState, dispatch } = useGameContext();

  const handleGoHome = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-black/20 backdrop-blur-md border-b border-white/10 p-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.button
          onClick={handleGoHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>الرئيسية</span>
        </motion.button>

        <div className="flex items-center gap-8">
          {/* Score */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-bold text-xl">{gameState.score}</span>
          </motion.div>

          {/* Streak */}
          {gameState.streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
            >
              <Zap className="w-6 h-6 text-purple-400" />
              <span className="text-white font-bold">{gameState.streak}x</span>
            </motion.div>
          )}

          {/* Timer (for timed mode) */}
          {gameState.gameMode === 'timed' && (
            <motion.div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                gameState.timeLeft <= 10 
                  ? 'bg-red-500/20 border-red-500/30 text-red-400' 
                  : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
              }`}
              animate={gameState.timeLeft <= 10 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: gameState.timeLeft <= 10 ? Infinity : 0 }}
            >
              <Clock className="w-6 h-6" />
              <span className="font-bold text-xl">{gameState.timeLeft}s</span>
            </motion.div>
          )}

          {/* Lives */}
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Heart
                  className={`w-8 h-8 ${
                    i < gameState.lives 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-600'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}