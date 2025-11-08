import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh } from 'lucide-react';

const MonkeyScore = ({ bananas, goal = 5 }) => {
  const progress = Math.min(1, bananas / goal);
  const isHappy = progress >= 1;

  return (
    <div className="bg-white rounded-2xl border border-orange-200/60 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6">
      <motion.div
        className={`w-24 h-24 rounded-full border flex items-center justify-center ${isHappy ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}
        animate={{ rotate: isHappy ? [0, -5, 5, 0] : 0 }}
        transition={{ repeat: isHappy ? Infinity : 0, duration: 3 }}
        aria-label="monkey-face"
      >
        {isHappy ? <Smile className="text-green-600 w-12 h-12" /> : <Meh className="text-orange-600 w-12 h-12" />}
      </motion.div>

      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold text-orange-700">Monkey Mood</div>
          <div className="text-sm text-orange-900/70">Bananas: {bananas}/{goal}</div>
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
    </div>
  );
};

export default MonkeyScore;
