import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  sparkleColor?: string;
  titleColor?: string;
  glowColor?: string;
  fontSize?: string;
}

export function AnimatedTitle({
  text,
  className = '',
  sparkleColor = '#E17A63',
  titleColor = '#56A57D',
  glowColor = 'rgba(86, 165, 125, 0.3)',
  fontSize = '3.5rem'
}: AnimatedTitleProps) {
  return (
    <h1 
      className={`flex items-center justify-center gap-6 relative py-4 ${className}`}
      style={{ 
        color: titleColor,
        textShadow: `2px 2px 0 ${sparkleColor}, 4px 4px 20px ${glowColor}`,
        fontSize: fontSize,
        fontWeight: 700
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-full h-full"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-secondary/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [-10, 0, 10, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles 
          className="w-10 h-10 drop-shadow-lg" 
          style={{ color: sparkleColor }}
        />
      </motion.div>

      <motion.span
        className="relative"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [10, 0, -10, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles 
          className="w-10 h-10 drop-shadow-lg" 
          style={{ color: sparkleColor }}
        />
      </motion.div>
    </h1>
  );
}