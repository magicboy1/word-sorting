import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Lightbulb, Zap } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

export function PowerUpBar() {
  const { gameState, dispatch } = useGameContext();

  const powerUps = [
    {
      id: 'freeze',
      name: 'تجميد الوقت',
      icon: Snowflake,
      count: gameState.powerUps.freeze,
      color: 'from-blue-500 to-cyan-500',
      description: 'يوقف العداد لـ 10 ثوان',
    },
    {
      id: 'hint',
      name: 'تلميح',
      icon: Lightbulb,
      count: gameState.powerUps.hint,
      color: 'from-yellow-500 to-orange-500',
      description: 'يظهر كلمة صحيحة',
    },
    {
      id: 'doublePoints',
      name: 'نقاط مضاعفة',
      icon: Zap,
      count: gameState.powerUps.doublePoints,
      color: 'from-purple-500 to-pink-500',
      description: 'يضاعف النقاط للكلمة التالية',
    },
  ] as const;

  const handleUsePowerUp = (powerUpId: 'freeze' | 'hint' | 'doublePoints') => {
    if (gameState.powerUps[powerUpId] > 0) {
      dispatch({ type: 'USE_POWERUP', payload: powerUpId });
    }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex gap-4 mb-8"
    >
      {powerUps.map((powerUp, index) => {
        const Icon = powerUp.icon;
        const isAvailable = powerUp.count > 0;

        return (
          <motion.button
            key={powerUp.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={isAvailable ? { scale: 1.05, y: -2 } : {}}
            whileTap={isAvailable ? { scale: 0.95 } : {}}
            onClick={() => handleUsePowerUp(powerUp.id)}
            disabled={!isAvailable}
            className={`
              relative group px-6 py-4 rounded-2xl border-2 transition-all duration-300
              ${isAvailable 
                ? `bg-gradient-to-br ${powerUp.color} border-white/30 hover:border-white/50 cursor-pointer` 
                : 'bg-gray-600/20 border-gray-600/30 cursor-not-allowed opacity-50'
              }
            `}
          >
            {/* Power-up icon */}
            <div className="flex items-center gap-3">
              <Icon className={`w-8 h-8 ${isAvailable ? 'text-white' : 'text-gray-400'}`} />
              
              {/* Count badge */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${isAvailable ? 'bg-white/20 text-white' : 'bg-gray-600/20 text-gray-400'}
              `}>
                {powerUp.count}
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/80 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                <div className="font-bold">{powerUp.name}</div>
                <div className="text-xs text-gray-300">{powerUp.description}</div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80" />
            </div>

            {/* Glow effect for available power-ups */}
            {isAvailable && (
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${powerUp.color} opacity-20`}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}