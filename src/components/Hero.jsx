import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border border-orange-200/50 shadow-sm">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-6 p-8 lg:p-10 min-h-[280px] items-center">
        <div className="max-w-xl">
          <motion.h1
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-orange-700 drop-shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            Alphabet Banana Quest
          </motion.h1>
          <motion.p
            className="mt-3 text-lg lg:text-xl text-orange-900/80"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Answer fun letter questions, collect bananas, and make the monkey smile!
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/30 pointer-events-none" />
          <motion.div
            className="ml-auto w-56 h-56 rounded-full bg-white/70 backdrop-blur border border-orange-200/60 flex items-center justify-center shadow-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140 }}
          >
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              aria-label="banana"
              role="img"
            >
              🍌
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
