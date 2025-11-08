import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BananaFlyLayer = ({ flights, onComplete }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-visible">
      <AnimatePresence>
        {flights.map((f) => (
          <motion.div
            key={f.id}
            initial={{ x: f.from.x, y: f.from.y, scale: 0.8, rotate: -10, opacity: 0.9 }}
            animate={{ x: f.to.x, y: f.to.y, scale: 0.6, rotate: 20, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => onComplete(f.id)}
            className="absolute"
          >
            <div className="text-3xl drop-shadow-sm">🍌</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BananaFlyLayer;
