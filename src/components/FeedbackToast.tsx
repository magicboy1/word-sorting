import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FeedbackToastProps {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
}

export function FeedbackToast({ type, message, isVisible }: FeedbackToastProps) {
  const bgColor = type === 'success' ? 'bg-primary' : 'bg-secondary';
  const Icon = type === 'success' ? CheckCircle2 : XCircle;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className={`fixed top-8 right-8 ${bgColor} 
                     text-white px-8 py-6 rounded-2xl shadow-xl z-50 
                     flex items-center gap-4 border-2 border-white/20
                     backdrop-blur-sm`}
        >
          <Icon className="w-8 h-8" />
          <span className="font-arabic text-2xl">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}