import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Star, RotateCcw } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

export function GameComplete() {
  const { gameState, dispatch } = useGameContext();

  const handleRestart = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const percentage = Math.round((gameState.score / (gameState.totalQuestions * 10)) * 100);

  let message = '';
  let emoji = '';
  if (percentage === 100) {
    message = 'ممتاز! أنت بطل الأمان!';
    emoji = '🏆';
  } else if (percentage >= 80) {
    message = 'رائع جداً! أنت تعرف الكثير عن الأمان!';
    emoji = '⭐';
  } else if (percentage >= 60) {
    message = 'جيد جداً! استمر في التعلم!';
    emoji = '👍';
  } else {
    message = 'حاول مرة أخرى لتحسين نتيجتك!';
    emoji = '💪';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      {percentage >= 80 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="relative">
          <Trophy className="w-32 h-32 text-yellow-500 drop-shadow-2xl" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -right-4 text-6xl"
          >
            {emoji}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold text-emerald-700 mb-4">
          أحسنت!
        </h1>
        <p className="text-2xl text-gray-700 font-medium">
          {message}
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 min-w-[400px]"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl">
            <span className="text-xl font-bold text-gray-700">النتيجة النهائية</span>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-3xl font-bold text-emerald-700">{gameState.score}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-2xl">
            <span className="text-xl font-bold text-gray-700">الأسئلة الصحيحة</span>
            <span className="text-3xl font-bold text-emerald-700">
              {gameState.score / 10} / {gameState.totalQuestions}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-100 to-blue-100 rounded-2xl">
            <span className="text-xl font-bold text-gray-700">النسبة المئوية</span>
            <span className="text-3xl font-bold text-emerald-700">{percentage}%</span>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRestart}
        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-5 rounded-2xl
                   font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300
                   border-4 border-white flex items-center gap-4"
      >
        <RotateCcw className="w-8 h-8" />
        <span>العب مرة أخرى</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center max-w-2xl"
      >
        <p className="text-lg text-gray-700 leading-relaxed">
          تذكر دائماً: أمانك على الإنترنت مسؤوليتك! استخدم ما تعلمته اليوم للحفاظ على خصوصيتك وأمانك الرقمي.
        </p>
      </motion.div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + i * 7}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
