import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const QuestionCard = ({ prompt, onSelect, disabled, correctLetter, feedbackKey, onLetterMount }) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="bg-white rounded-2xl border border-orange-200/60 shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-orange-700">Pick the right letter</h2>
        <div className="text-sm text-orange-900/70">Hint: Listen and look carefully!</div>
      </div>

      <div className="grid md:grid-cols-[1fr,300px] gap-6 items-start">
        <div>
          <motion.div
            key={prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-lg md:text-xl text-orange-900/90 bg-orange-50 rounded-xl p-4 border border-orange-200/70"
          >
            {prompt}
          </motion.div>

          <div className="mt-4 grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-13 gap-2">
            {letters.map((letter) => (
              <LetterButton
                key={letter}
                letter={letter}
                onSelect={onSelect}
                disabled={disabled}
                isCorrect={correctLetter && letter === correctLetter}
                onMount={(el) => onLetterMount && onLetterMount(letter, el)}
              />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-orange-200/70 p-4">
          <div className="text-sm font-semibold text-orange-700 mb-2">Micro help</div>
          <ul className="space-y-2 text-orange-900/80 text-sm list-disc pl-5">
            <li>Say the letter sound aloud.</li>
            <li>Look at the picture in your mind.</li>
            <li>Try again if it doesn’t smile yet!</li>
          </ul>

          <AnimatePresence mode="wait">
            {disabled && (
              <motion.div
                key={feedbackKey}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold border ${correctLetter ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
              >
                {correctLetter ? 'Great job! Banana unlocked!' : 'Oops! Try another letter.'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const LetterButton = ({ letter, onSelect, disabled, isCorrect, onMount }) => {
  const ref = useRef(null);

  const handleClick = () => {
    if (disabled) return;
    onSelect(letter, ref.current);
  };

  return (
    <motion.button
      ref={(el) => {
        ref.current = el;
        if (el && onMount) onMount(el);
      }}
      className={`aspect-square rounded-xl border text-lg font-bold flex items-center justify-center select-none transition-colors
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        bg-white text-orange-800 border-orange-200`}
      whileHover={!disabled ? { scale: 1.05, boxShadow: '0 6px 16px rgba(0,0,0,0.08)' } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      animate={isCorrect ? { backgroundColor: '#22c55e', color: '#ffffff' } : {}}
      onClick={handleClick}
    >
      {letter}
    </motion.button>
  );
};

export default QuestionCard;
