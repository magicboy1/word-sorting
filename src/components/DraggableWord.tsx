import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDragBoundary } from '../hooks/useDragBoundary';
import { useGameSounds } from '../hooks/useGameSounds';

interface DraggableWordProps {
  word: string;
  isCorrect: boolean;
  onDragStart: (e: React.DragEvent, word: string, isCorrect: boolean) => void;
}

export function DraggableWord({ word, isCorrect, onDragStart }: DraggableWordProps) {
  const [isDragging, setIsDragging] = useState(false);
  const checkBoundary = useDragBoundary();
  const dragInterval = useRef<number | null>(null);
  const { playSound } = useGameSounds();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (dragInterval.current) {
        clearInterval(dragInterval.current);
      }
    };
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(e, word, isCorrect);
    playSound('drag');
    
    // Create a custom drag image
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const dragImage = elementRef.current.cloneNode(true) as HTMLDivElement;
      
      // Style the drag image
      Object.assign(dragImage.style, {
        position: 'fixed',
        top: '-1000px',
        left: '-1000px',
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transform: 'scale(0.8)',
        opacity: '0.9',
        pointerEvents: 'none',
        zIndex: '1000',
        transition: 'transform 0.2s ease',
      });

      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2);
      
      // Remove the drag image after it's no longer needed
      requestAnimationFrame(() => {
        document.body.removeChild(dragImage);
      });
    }

    dragInterval.current = window.setInterval(() => {
      checkBoundary(e.nativeEvent);
    }, 100);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragInterval.current) {
      clearInterval(dragInterval.current);
      dragInterval.current = null;
    }
  };

  return (
    <motion.div
      ref={elementRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`word-card cursor-move select-none px-4 py-3 rounded-xl text-white text-lg
                 font-arabic transition-all duration-500 transform
                 w-full text-center ${isDragging ? 'opacity-50 scale-95' : ''}`}
      whileHover={{ 
        scale: 1.05,
        rotate: [-1, 1],
        transition: { rotate: { repeat: Infinity, duration: 0.3, repeatType: "reverse" } }
      }}
      whileTap={{ scale: 0.95, rotate: 0 }}
      animate={isDragging
        ? { 
            scale: 0.95,
            opacity: 0.5,
            rotate: 0
          }
        : { 
            scale: 1,
            opacity: 1,
            rotate: [0, -0.5, 0.5, 0],
            transition: {
              rotate: {
                repeat: Infinity,
                duration: 4,
                ease: "linear"
              }
            },
          }}
    >
      {word}
    </motion.div>
  );
}