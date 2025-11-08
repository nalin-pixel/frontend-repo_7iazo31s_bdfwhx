import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Meh } from 'lucide-react';

const Sparkle = ({ delay = 0, className = '' }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1, 0.6], opacity: [0, 1, 0] }}
    transition={{ duration: 0.8, delay }}
  >
    <div className="w-2 h-2 bg-yellow-400 rounded-full shadow" />
  </motion.div>
);

const MonkeyScore = forwardRef(({ bananas, goal = 5, celebrate = false }, counterRef) => {
  const progress = Math.min(1, bananas / goal);
  const stage = progress >= 1 ? 'joy' : progress >= 0.5 ? 'happy' : 'neutral';

  return (
    <div className="relative bg-white rounded-2xl border border-orange-200/60 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6">
      <motion.div
        className={`relative w-24 h-24 rounded-full border flex items-center justify-center ${stage !== 'neutral' ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}
        animate={stage === 'joy' ? { scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] } : stage === 'happy' ? { scale: [1, 1.03, 1] } : {}}
        transition={{ duration: 0.8, repeat: stage === 'joy' ? Infinity : 0 }}
        aria-label="monkey-face"
      >
        <div className="relative">
          {stage === 'neutral' ? (
            <Meh className="text-orange-600 w-12 h-12" />
          ) : (
            <Smile className="text-green-600 w-12 h-12" />
          )}
          {/* Cheek glow */}
          <AnimatePresence>
            {stage !== 'neutral' && (
              <>
                <motion.div
                  className="absolute -bottom-1 -left-2 w-3 h-2 rounded-full bg-pink-300/60"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="absolute -bottom-1 -right-2 w-3 h-2 rounded-full bg-pink-300/60"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold text-orange-700">Monkey Mood</div>
          <div ref={counterRef} className="text-sm text-orange-900/70 px-2 py-1 rounded-lg bg-yellow-50 border border-yellow-200 shadow-sm">
            🍌 {bananas}/{goal}
          </div>
        </div>
        <div className="w-full h-3 rounded-full bg-orange-100 overflow-hidden">
          <motion.div
            className="h-3 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"
            style={{ width: `${progress * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 120 }}
          />
        </div>
        <div className="text-xs mt-2 text-orange-900/70">Collect bananas to make the monkey smile!</div>
      </div>

      {/* Sparkles when celebrating */}
      <AnimatePresence>
        {celebrate && (
          <div className="absolute inset-0 pointer-events-none">
            <Sparkle className="top-3 left-6" />
            <Sparkle className="top-2 right-10" delay={0.1} />
            <Sparkle className="bottom-4 left-10" delay={0.2} />
            <Sparkle className="bottom-6 right-6" delay={0.3} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default MonkeyScore;
