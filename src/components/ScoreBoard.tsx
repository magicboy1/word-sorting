import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoreBoardProps {
  score: number;
  level: number;
}

export function ScoreBoard({ score, level }: ScoreBoardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [1, 1.02, 1],
        opacity: 1,
      }}
      transition={{
        scale: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }}
      className="flex gap-8 bg-white rounded-2xl p-6 shadow-lg border-4 border-secondary/20"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Trophy className="text-secondary w-8 h-8" />
        </motion.div>
        <span className="text-3xl font-bold text-accent font-arabic">{score}</span>
      </div>
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
            rotate: {
              repeat: Infinity,
              duration: 8,
              ease: "linear",
            },
          }}
        >
          <Star className="text-primary w-8 h-8" />
        </motion.div>
        <span className="text-3xl font-bold text-accent font-arabic">{level}</span>
      </div>
    </motion.div>
  );
}