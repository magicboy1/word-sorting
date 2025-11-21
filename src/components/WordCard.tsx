import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Word } from '../contexts/GameContext';

interface WordCardProps {
  word: Word;
  onDrop: (word: string, isCorrect: boolean) => void;
  isCorrect: boolean;
}

export function WordCard({ word, onDrop, isCorrect }: WordCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', word.text);
    e.dataTransfer.setData('isCorrect', isCorrect.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getDifficultyColor = () => {
    switch (word.difficulty) {
      case 1: return 'from-green-500 to-emerald-600';
      case 2: return 'from-yellow-500 to-orange-600';
      case 3: return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyStars = () => {
    return '★'.repeat(word.difficulty);
  };

  return (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`relative cursor-move select-none transition-all duration-300 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      whileHover={{ 
        scale: 1.05,
        rotate: [-1, 1, -1],
        transition: { rotate: { repeat: Infinity, duration: 0.5 } }
      }}
      whileTap={{ scale: 0.95 }}
      animate={!isDragging ? {
        y: [0, -5, 0],
        rotate: [0, 1, -1, 0],
      } : {}}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className={`
        relative p-6 rounded-2xl bg-gradient-to-br ${getDifficultyColor()}
        shadow-lg hover:shadow-xl border border-white/20
        backdrop-blur-sm overflow-hidden
      `}>
        {/* Difficulty indicator */}
        <div className="absolute top-2 right-2 text-white/80 text-sm font-bold">
          {getDifficultyStars()}
        </div>

        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Word text */}
        <div className="relative z-10 text-center">
          <span className="text-white font-bold text-lg block mb-2">
            {word.text}
          </span>
          
          {/* Category hint (subtle) */}
          <div className="text-white/60 text-xs">
            {word.difficulty === 3 ? 'صعب' : word.difficulty === 2 ? 'متوسط' : 'سهل'}
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,255,255,0.1)',
              '0 0 30px rgba(255,255,255,0.2)',
              '0 0 20px rgba(255,255,255,0.1)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}