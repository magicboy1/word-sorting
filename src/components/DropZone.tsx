import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Leaf, UtensilsCrossed, Car, CheckCircle2 } from 'lucide-react';

interface DropZoneProps {
  category: 'internet' | 'nature' | 'food' | 'transport';
  correctWords: string[];
  onDrop: (word: string, isCorrect: boolean) => void;
}

const CATEGORY_CONFIG = {
  internet: { 
    name: 'الإنترنت والتكنولوجيا', 
    icon: Globe, 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  nature: { 
    name: 'الطبيعة والبيئة', 
    icon: Leaf, 
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  food: { 
    name: 'الطعام والتغذية', 
    icon: UtensilsCrossed, 
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  transport: { 
    name: 'النقل والمواصلات', 
    icon: Car, 
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
};

export function DropZone({ category, correctWords, onDrop }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const word = e.dataTransfer.getData('text/plain');
    const isCorrect = e.dataTransfer.getData('isCorrect') === 'true';
    
    onDrop(word, isCorrect);
  };

  return (
    <motion.div
      className="relative w-96 h-96"
      animate={{
        scale: isDragOver ? 1.05 : [1, 1.02, 1],
        y: isDragOver ? -10 : [0, -5, 0],
      }}
      transition={{
        scale: { duration: 0.2 },
        y: isDragOver ? { duration: 0.2 } : { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Main drop zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full h-full rounded-3xl border-4 border-dashed
          ${isDragOver ? config.borderColor : 'border-white/30'}
          ${isDragOver ? config.bgColor : 'bg-white/10'}
          backdrop-blur-md transition-all duration-300
          flex flex-col items-center justify-center p-8
          overflow-hidden
        `}
        animate={{
          borderColor: isDragOver ? undefined : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)'],
        }}
        transition={{
          borderColor: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-10`}
          animate={{
            opacity: isDragOver ? 0.3 : [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Category icon */}
        <motion.div
          animate={{
            scale: isDragOver ? 1.2 : [1, 1.1, 1],
            rotate: isDragOver ? [0, 10, -10, 0] : [0, 5, -5, 0],
          }}
          transition={{
            scale: { duration: 0.3 },
            rotate: isDragOver 
              ? { duration: 0.5, repeat: Infinity } 
              : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mb-6"
        >
          <Icon className="w-20 h-20 text-white drop-shadow-lg" />
        </motion.div>

        {/* Category name */}
        <h3 className="text-white text-2xl font-bold text-center mb-6">
          {config.name}
        </h3>

        {/* Drop instruction */}
        <AnimatePresence>
          {correctWords.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-white/70 text-center text-lg"
            >
              اسحب الكلمات المناسبة إلى هنا
            </motion.p>
          )}
        </AnimatePresence>

        {/* Correct words display */}
        <div className="absolute bottom-4 left-4 right-4">
          <AnimatePresence>
            {correctWords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {correctWords.map((word, index) => (
                  <motion.div
                    key={word}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm">{word}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulse effect when dragging over */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 0.3 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${config.color}`}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${config.color} rounded-full opacity-40`}
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + i,
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
    </motion.div>
  );
}