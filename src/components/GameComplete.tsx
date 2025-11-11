import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { useGameSounds } from '../hooks/useGameSounds';
import { Trophy, Star, Sparkles } from 'lucide-react';

interface GameCompleteProps {
  score: number;
}

export function GameComplete({ score }: GameCompleteProps) {
  const { playSound } = useGameSounds();

  useEffect(() => {
    playSound('gameComplete');
  }, [playSound]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-accent/50 backdrop-blur-sm z-50"
    >
      <Confetti
        colors={['#56A57D', '#E17A63', '#526B96', '#4A2B2B']}
        numberOfPieces={500}
        recycle={true}
        gravity={0.2}
      />
      
      <div className="bg-white rounded-3xl p-12 text-center font-arabic border-8 border-primary shadow-2xl max-w-2xl w-full mx-4">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <Sparkles className="w-12 h-12 text-secondary" />
          <Trophy className="w-16 h-16 text-primary" />
          <Sparkles className="w-12 h-12 text-secondary" />
        </motion.div>

        <motion.h2 
          className="text-5xl font-bold mb-8 text-primary"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          مبروك! لقد أكملت اللعبة
        </motion.h2>

        <motion.div
          className="flex justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-12 h-12 text-secondary"
              fill="currentColor"
            />
          ))}
        </motion.div>

        <motion.p 
          className="text-4xl mb-10 text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          النتيجة النهائية: <span className="font-bold text-primary">{score}</span>
        </motion.p>

        <motion.button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-10 py-5 rounded-xl text-2xl
                   transition-all transform hover:-translate-y-1 hover:shadow-lg
                   hover:bg-primary/90 flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          العب مرة أخرى
        </motion.button>
      </div>
    </motion.div>
  );
}