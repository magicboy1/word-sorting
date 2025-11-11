import React from 'react';
import { motion } from 'framer-motion';

export function CloudShape() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      {/* Main cloud body - more rounded and playful */}
      <motion.path
        d="M 40,70
           C 20,70 20,50 40,50
           C 40,20 80,20 85,50
           C 90,20 130,20 135,50
           C 160,45 170,65 160,75
           C 170,85 160,100 140,100
           L 60,100
           C 30,100 20,85 40,70"
        fill="url(#cloudGradient)"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Softer cloud highlights */}
      <motion.circle
        cx="70"
        cy="60"
        r="18"
        fill="rgba(255, 255, 255, 0.6)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      <motion.circle
        cx="120"
        cy="55"
        r="22"
        fill="rgba(255, 255, 255, 0.4)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      />

      {/* Gradient definitions - softer, more playful colors */}
      <defs>
        <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="50%" stopColor="#f0f9ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}