import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Volume2 } from 'lucide-react';

const Controls = ({ onNext, onRepeat, onSpeak, canNext }) => {
  return (
    <div className="flex items-center gap-3">
      <motion.button
        className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow"
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        disabled={!canNext}
        aria-disabled={!canNext}
      >
        Next Question
      </motion.button>

      <motion.button
        className="px-3 py-2 rounded-xl bg-white border border-orange-200 text-orange-700 hover:bg-orange-50 font-semibold"
        whileTap={{ scale: 0.97 }}
        onClick={onRepeat}
      >
        <RotateCcw className="inline-block mr-2 w-4 h-4" />
        Try Again
      </motion.button>

      <motion.button
        className="px-3 py-2 rounded-xl bg-white border border-orange-200 text-orange-700 hover:bg-orange-50 font-semibold"
        whileTap={{ scale: 0.97 }}
        onClick={onSpeak}
      >
        <Volume2 className="inline-block mr-2 w-4 h-4" />
        Hear It
      </motion.button>
    </div>
  );
};

export default Controls;
