import React from 'react';
import { motion } from 'framer-motion';

export function BackgroundCharacter() {
  return (
    <motion.div
      className="absolute top-7 left-7 w-24 h-24 z-0"
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
      }}
      transition={{ 
        duration: 0.8,
        ease: "backOut",
      }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src="https://wsad.sa/wp-content/Asset-5.svg?w=200&h=200&fit=crop&q=80"
          alt="Game Character"
          className="w-full h-full object-contain drop-shadow-xl"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          draggable="false"
          style={{
            filter: "drop-shadow(0 8px 16px rgba(86, 165, 125, 0.25))"
          }}
        />
      </motion.div>
    </motion.div>
  );
}