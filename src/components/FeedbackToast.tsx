import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

export function FeedbackToast() {
  const { gameState } = useGameContext();
  const { feedback } = gameState;

  const getIcon = () => {
    switch (feedback.type) {
      case 'success': return CheckCircle2;
      case 'error': return XCircle;
      case 'hint': return Lightbulb;
      default: return CheckCircle2;
    }
  };

  const getColors = () => {
    switch (feedback.type) {
      case 'success': return 'from-green-500 to-emerald-600 border-green-400/50';
      case 'error': return 'from-red-500 to-pink-600 border-red-400/50';
      case 'hint': return 'from-yellow-500 to-orange-600 border-yellow-400/50';
      default: return 'from-green-500 to-emerald-600 border-green-400/50';
    }
  };

  const Icon = getIcon();

  return (
    <AnimatePresence>
      {feedback.isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 100, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-8 right-8 z-50"
        >
          <motion.div
            className={`
              px-8 py-6 rounded-2xl bg-gradient-to-br ${getColors()}
              border-2 backdrop-blur-md shadow-2xl
              flex items-center gap-4 min-w-[200px]
            `}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
              }}
            >
              <Icon className="w-8 h-8 text-white drop-shadow-lg" />
            </motion.div>
            
            <span className="text-white font-bold text-xl">
              {feedback.message}
            </span>

            {/* Sparkle effects */}
            {feedback.type === 'success' && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, (i - 1) * 30],
                      y: [0, -20],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.2,
                      repeat: 2,
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}