import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import MonkeyScore from './components/MonkeyScore';
import QuestionCard from './components/QuestionCard';
import Controls from './components/Controls';
import BackgroundOrnaments from './components/BackgroundOrnaments';
import BananaFlyLayer from './components/BananaFlyLayer';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const buildQuestions = () => letters.map((L) => ({ prompt: `Which letter matches the sound? ${L}`, answer: L }));

function useSpeech() {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const speak = (text) => {
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.pitch = 1.1;
    synth.cancel();
    synth.speak(utter);
  };
  return speak;
}

const App = () => {
  const [index, setIndex] = useState(0);
  const [bananas, setBananas] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lastWasCorrect, setLastWasCorrect] = useState(null);
  const [flights, setFlights] = useState([]);
  const [celebrate, setCelebrate] = useState(false);
  const counterRef = useRef(null);
  const speak = useSpeech();

  const questions = useMemo(() => buildQuestions(), []);
  const question = questions[index % questions.length];

  const createFlight = (fromEl) => {
    if (!fromEl || !counterRef.current) return;
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = counterRef.current.getBoundingClientRect();
    const id = `${Date.now()}-${Math.random()}`;
    setFlights((prev) => [
      ...prev,
      {
        id,
        from: { x: fromRect.left + fromRect.width / 2, y: fromRect.top + fromRect.height / 2 },
        to: { x: toRect.left + toRect.width / 2, y: toRect.top + toRect.height / 2 },
      },
    ]);
  };

  const handleSelect = (letter, el) => {
    if (locked) return;
    const correct = letter === question.answer;
    setLastWasCorrect(correct);
    setLocked(true);
    if (correct) {
      createFlight(el);
      // Delay counter increment to sync with landing pop
      setTimeout(() => {
        setBananas((b) => {
          const next = b + 1;
          if (next % 3 === 0) {
            setCelebrate(true);
            setTimeout(() => setCelebrate(false), 900);
          }
          return next;
        });
      }, 600);
      // Auto-advance after short celebration
      setTimeout(() => nextQuestion(true), 900);
    } else {
      // For wrong answer, unlock after short shake
      setTimeout(() => setLocked(false), 500);
    }
  };

  const nextQuestion = (fromAuto = false) => {
    setIndex((i) => i + 1);
    setLocked(false);
    setLastWasCorrect(null);
  };

  const repeatQuestion = () => {
    setLocked(false);
    setLastWasCorrect(null);
  };

  const speakPrompt = () => {
    speak(question.prompt);
  };

  const onFlightComplete = (id) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
  };

  // Target screen size wrapper for design fidelity
  const containerStyle = {
    width: 1512,
    height: 982,
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-50 to-white py-6 px-4 md:py-10 md:px-8" style={containerStyle}>
      <BackgroundOrnaments />
      <BananaFlyLayer flights={flights} onComplete={onFlightComplete} />

      <div className="space-y-6">
        <Hero />

        <MonkeyScore bananas={bananas} goal={5} celebrate={celebrate} ref={counterRef} />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <QuestionCard
              prompt={question.prompt}
              onSelect={handleSelect}
              disabled={locked}
              correctLetter={lastWasCorrect && question.answer}
              feedbackKey={`${index}-${locked}-${lastWasCorrect}`}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-orange-900/70"
          >
            Tip: Collect 5 bananas to make the monkey smile big!
          </motion.div>

          <Controls
            onNext={() => nextQuestion(false)}
            onRepeat={repeatQuestion}
            onSpeak={speakPrompt}
            canNext={true}
          />
        </div>

        <footer className="text-center text-xs text-orange-900/60 pt-2">Designed for ages 4–6 • Friendly micro-interactions • Learn by play</footer>
      </div>
    </div>
  );
};

export default App;
