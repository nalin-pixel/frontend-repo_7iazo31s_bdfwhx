import React from 'react';
import { motion } from 'framer-motion';

const Cloud = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ x: -40, opacity: 0.6 }}
    animate={{ x: 40, opacity: 1 }}
    transition={{ repeat: Infinity, repeatType: 'mirror', duration: 10, delay }}
  >
    <div className="w-24 h-14 bg-white/70 rounded-full blur-[1px] shadow-sm" />
  </motion.div>
);

const Vine = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ y: -6, rotate: -2 }}
    animate={{ y: 6, rotate: 2 }}
    transition={{ repeat: Infinity, repeatType: 'mirror', duration: 6, delay }}
  >
    <div className="w-2 h-40 bg-green-500/50 rounded-full" />
  </motion.div>
);

const BackgroundOrnaments = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Cloud className="top-16 left-10" />
      <Cloud className="top-28 right-16" delay={1.2} />
      <Cloud className="top-64 left-40" delay={0.7} />
      <Vine className="top-0 left-6" />
      <Vine className="top-0 right-10" delay={0.5} />
    </div>
  );
};

export default BackgroundOrnaments;
