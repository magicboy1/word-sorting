import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Play } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

export function StartScreen() {
  const { dispatch } = useGameContext();

  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6"
        >
          <Shield className="w-24 h-24 mx-auto text-emerald-600 drop-shadow-lg" />
        </motion.div>

        <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent mb-4">
          في أمان السوشيال ميديا
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          تعلم كيف تحافظ على أمانك وخصوصيتك على الإنترنت من خلال لعبة تعليمية ممتعة!
        </p>
      </motion.div>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartGame}
        className="relative px-12 py-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500
                   shadow-2xl hover:shadow-3xl transition-all duration-300
                   border-4 border-white"
      >
        <div className="flex items-center gap-4">
          <Play className="w-10 h-10 text-white fill-white" />
          <span className="text-white font-bold text-3xl">ابدأ اللعب</span>
        </div>

        <motion.div
          className="absolute inset-0 rounded-3xl bg-white/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl"
      >
        {[
          { icon: '🔒', text: 'الخصوصية' },
          { icon: '🛡️', text: 'الأمان' },
          { icon: '🤝', text: 'الاحترام' },
          { icon: '💡', text: 'الوعي' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-gray-700 font-bold">{item.text}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
