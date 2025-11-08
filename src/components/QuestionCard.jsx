import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letterOptions = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const QuestionCard = ({ prompt, onSelect, disabled, correctLetter, feedbackKey }) => {
  return (
    <div className="bg-white rounded-2xl border border-orange-200/60 shadow-sm p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-orange-700">Pick the right letter</h2>
        <div className="text-sm text-orange-900/70">Hint: Listen and look carefully!</div>
      </div>

      <div className="grid md:grid-cols-[1fr,300px] gap-6 items-start">
        <div>
          <div className="text-lg md:text-xl text-orange-900/90 bg-orange-50 rounded-xl p-4 border border-orange-200/70">
            {prompt}
          </div>

          <div className="mt-4 grid grid-cols-8 sm:grid-cols-10 md:grid-cols-13 gap-2">
            {letterOptions.map((letter) => {
              const isCorrect = letter === correctLetter;
              return (
                <motion.button
                  key={letter}
                  className={`aspect-square rounded-xl border text-lg font-bold flex items-center justify-center select-none
                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                    ${isCorrect && disabled ? 'bg-green-500 text-white border-green-600' : 'bg-white text-orange-800 border-orange-200 hover:bg-orange-50 active:scale-95'}`}
                  onClick={() => onSelect(letter)}
                  disabled={disabled}
                  whileTap={{ scale: 0.95 }}
                >
                  {letter}
                </motion.button>
              );
            })}
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

export default QuestionCard;
