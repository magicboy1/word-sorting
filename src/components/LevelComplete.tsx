import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowLeft } from 'lucide-react';

interface LevelCompleteProps {
  level: number;
  score: number;
  onContinue: () => void;
}

export function LevelComplete({ level, score, onContinue }: LevelCompleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-accent/30 backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-10 text-center font-arabic shadow-2xl border-8 border-primary/20"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-center mb-6"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <Star
                className={`w-16 h-16 ${i < level ? 'text-primary' : 'text-gray-200'}`}
                fill={i < level ? 'currentColor' : 'none'}
              />
            </motion.div>
          ))}
        </motion.div>

        <h2 className="text-4xl font-bold mb-4 text-primary">
          أحسنت! لقد أكملت المستوى {level}
        </h2>
        
        <p className="text-2xl mb-6 text-accent/80">
          النتيجة الحالية: {score}
        </p>

        <motion.button
          onClick={onContinue}
          className="bg-primary text-white px-8 py-4 rounded-xl text-2xl
                     hover:bg-primary/90 transition-all transform hover:-translate-y-1
                     hover:shadow-lg flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-6 h-6" />
          المستوى التالي
        </motion.button>
      </motion.div>
    </motion.div>
  );
}