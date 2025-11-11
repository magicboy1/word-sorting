import React, { useState } from 'react';
import { CloudShape } from './CloudShape';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface CloudBoxProps {
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  words: string[];
}

export function CloudBox({ onDragOver, onDrop, words }: CloudBoxProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(e);
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onDrop(e);
  };

  return (
    <motion.div 
      className="relative w-[500px] h-[300px] flex flex-col items-center justify-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={{
        y: isDragOver ? -15 : [0, -10, 0], 
        scale: isDragOver ? 1.05 : [1, 1.02, 1],
        rotate: isDragOver ? [-2, 2] : [0, -1, 1, 0],
      }}
      transition={{ 
        y: isDragOver ? { duration: 0.2 } : { repeat: Infinity, duration: 6, ease: "easeInOut" },
        rotate: isDragOver 
          ? { repeat: Infinity, duration: 0.3, repeatType: "reverse" }
          : { repeat: Infinity, duration: 8, ease: "easeInOut" },
        scale: { duration: 0.2 },
      }}
    >
      {/* Cloud container with enhanced shadow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative w-full h-full filter ${
          isDragOver 
            ? 'drop-shadow-[0_20px_35px_rgba(86,165,125,0.5)]' 
            : 'drop-shadow-[0_20px_35px_rgba(86,165,125,0.3)]'
        } transition-all duration-300`}>
          {/* Background decorative clouds */}
          <div className="absolute -top-12 -left-16 w-36 h-36 opacity-40 transform -rotate-12">
            <CloudShape />
          </div>
          <div className="absolute -top-8 -right-12 w-32 h-32 opacity-40 transform rotate-12">
            <CloudShape />
          </div>
          
          {/* Main cloud */}
          <div className={`relative w-full h-full ${isDragOver ? 'animate-pulse-slow' : 'animate-float'}`}>
            <CloudShape />
          </div>
        </div>
      </div>

      {/* Content container */}
      <motion.div 
        className={`relative z-10 w-[92%] h-[85%] backdrop-blur-sm rounded-[3rem]
                   shadow-[0_12px_48px_rgba(86,165,125,0.25)] border-6
                   flex items-center justify-center p-6 overflow-hidden ${
                     isDragOver 
                       ? 'bg-white/98 border-primary/30' 
                       : 'bg-white/95 border-white/60'
                   }`}
        animate={{ 
          y: isDragOver ? -5 : [0, -5, 0],
          scale: isDragOver ? 1.02 : [1, 1.01, 1],
        }}
        transition={{ 
          y: isDragOver ? { duration: 0.2 } : { repeat: Infinity, duration: 5, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
      >
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <AnimatePresence>
            {words.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="flex justify-center mb-4"
                >
                  <ArrowDown className="w-12 h-12 text-primary/50" />
                </motion.div>
                <p className="text-2xl text-accent/50 font-arabic">
                  اسحب الكلمات المتعلقة بالإنترنت إلى هنا
                </p>
              </motion.div>
            ) : (
              words.map((word) => (
                <motion.span
                  key={word}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="px-4 py-2 bg-primary/10 text-accent rounded-xl text-lg font-arabic
                            shadow-sm border-2 border-primary/20"
                >
                  {word}
                </motion.span>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Enhanced drop zone indicator */}
      <motion.div
        className={`absolute inset-0 rounded-[3rem] border-4 border-dashed ${
          isDragOver ? 'border-primary/50' : 'border-primary/30'
        }`}
        animate={{
          opacity: isDragOver ? [0.4, 0.6, 0.4] : [0.2, 0.4, 0.2],
          scale: isDragOver ? [1, 1.02, 1] : [0.98, 1, 0.98],
        }}
        transition={{
          duration: isDragOver ? 1 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}