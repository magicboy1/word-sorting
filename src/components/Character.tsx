import React from 'react';
import { motion } from 'framer-motion';

export function Character() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <motion.div
        className="w-96 h-96"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        >
          {/* Cape */}
          <path
            d="M200 120 
               C 240 120, 280 140, 280 220
               L 240 220
               C 240 160, 200 160, 200 160
               C 200 160, 160 160, 160 220
               L 120 220
               C 120 140, 160 120, 200 120
               Z"
            fill="#E17A63"
          />

          {/* Legs */}
          <path
            d="M180 220 L180 300 L160 300 L160 320 L200 320 L200 300 L220 300 L220 220"
            fill="#1F2937"
          />

          {/* Boots */}
          <rect x="155" y="320" width="45" height="30" fill="#4A2B2B" rx="5" />
          <rect x="200" y="320" width="45" height="30" fill="#4A2B2B" rx="5" />

          {/* Body/Shirt */}
          <rect x="170" y="160" width="60" height="70" fill="#FFFFFF" rx="10" />
          
          {/* Small Logo on Shirt */}
          <circle cx="200" cy="185" r="8" fill="#E17A63" />

          {/* Head */}
          <circle cx="200" cy="130" r="40" fill="#FFE4D6" />

          {/* Hair */}
          <path
            d="M160 130 
               C 160 110, 180 90, 200 90
               C 220 90, 240 110, 240 130
               L 240 120
               C 240 100, 220 80, 200 80
               C 180 80, 160 100, 160 120
               Z"
            fill="#1F2937"
          />

          {/* Braids */}
          <path
            d="M170 125 Q165 145 170 165"
            stroke="#1F2937"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M230 125 Q235 145 230 165"
            stroke="#1F2937"
            strokeWidth="8"
            fill="none"
          />

          {/* Face */}
          <circle cx="185" cy="125" r="5" fill="#1F2937" /> {/* Left eye */}
          <circle cx="215" cy="125" r="5" fill="#1F2937" /> {/* Right eye */}
          <path
            d="M190 140 Q200 150 210 140"
            stroke="#1F2937"
            strokeWidth="3"
            fill="none"
          /> {/* Smile */}

          {/* Neck Scarf */}
          <path
            d="M185 160 Q200 170 215 160"
            fill="#4A2B2B"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}