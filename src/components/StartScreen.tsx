import React from 'react';
import { motion } from 'framer-motion';
import { Play, Zap, Clock, Infinity, Globe, Leaf, UtensilsCrossed, Car } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

const CATEGORIES = [
  { id: 'internet', name: 'الإنترنت والتكنولوجيا', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { id: 'nature', name: 'الطبيعة والبيئة', icon: Leaf, color: 'from-green-500 to-emerald-500' },
  { id: 'food', name: 'الطعام والتغذية', icon: UtensilsCrossed, color: 'from-orange-500 to-red-500' },
  { id: 'transport', name: 'النقل والمواصلات', icon: Car, color: 'from-purple-500 to-pink-500' },
] as const;

const GAME_MODES = [
  { id: 'classic', name: 'كلاسيكي', description: 'العب بدون ضغط الوقت', icon: Play, color: 'from-indigo-500 to-purple-500' },
  { id: 'timed', name: 'مؤقت', description: '60 ثانية للفوز', icon: Clock, color: 'from-red-500 to-pink-500' },
  { id: 'endless', name: 'لا نهائي', description: 'استمر قدر ما تستطيع', icon: Infinity, color: 'from-green-500 to-teal-500' },
] as const;

export function StartScreen() {
  const { gameState, dispatch } = useGameContext();

  const handleStartGame = (mode: 'classic' | 'timed' | 'endless') => {
    dispatch({ type: 'START_GAME', payload: { mode } });
  };

  const handleCategorySelect = (category: 'internet' | 'nature' | 'food' | 'transport') => {
    dispatch({ type: 'SELECT_CATEGORY', payload: category });
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
            scale: [1, 1.05, 1],
            rotate: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6"
        >
          <Zap className="w-20 h-20 mx-auto text-yellow-400 drop-shadow-lg" />
        </motion.div>
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          لعبة الكلمات الذكية
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          اختبر معرفتك وسرعة بديهتك في تصنيف الكلمات. اختر الفئة المناسبة واستمتع بتجربة لعب مثيرة!
        </p>
      </motion.div>

      {/* Category Selection */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">اختر الفئة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            const isSelected = gameState.selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategorySelect(category.id as any)}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${category.color} 
                           shadow-lg hover:shadow-xl transition-all duration-300
                           ${isSelected ? 'ring-4 ring-white ring-opacity-50' : ''}`}
              >
                <div className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-3 text-white drop-shadow-lg" />
                  <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                </div>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Game Mode Selection */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">اختر نمط اللعب</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {GAME_MODES.map((mode, index) => {
            const Icon = mode.icon;
            
            return (
              <motion.button
                key={mode.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartGame(mode.id as any)}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${mode.color} 
                           shadow-xl hover:shadow-2xl transition-all duration-300
                           border border-white/20 backdrop-blur-sm`}
              >
                <div className="text-center">
                  <Icon className="w-16 h-16 mx-auto mb-4 text-white drop-shadow-lg" />
                  <h3 className="text-white font-bold text-2xl mb-2">{mode.name}</h3>
                  <p className="text-white/90 text-lg">{mode.description}</p>
                </div>
                
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-white/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full opacity-20"
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
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}