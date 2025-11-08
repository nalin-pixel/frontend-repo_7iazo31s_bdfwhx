import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import MonkeyScore from './components/MonkeyScore';
import QuestionCard from './components/QuestionCard';
import Controls from './components/Controls';

const questionsBank = [
  { prompt: 'Which letter starts the word Apple?', answer: 'A' },
  { prompt: 'Find the letter that sounds like /b/ as in ball.', answer: 'B' },
  { prompt: 'Tap the letter that starts Cat.', answer: 'C' },
  { prompt: 'Which letter makes the sound /d/?', answer: 'D' },
  { prompt: 'Which letter starts Elephant?', answer: 'E' },
  { prompt: 'Find the letter for Fish.', answer: 'F' },
  { prompt: 'Which letter starts Grape?', answer: 'G' },
  { prompt: 'Tap the letter that makes the sound /h/.', answer: 'H' },
];

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
  const speak = useSpeech();

  const question = questionsBank[index % questionsBank.length];

  const handleSelect = (letter) => {
    if (locked) return;
    const correct = letter === question.answer;
    setLastWasCorrect(correct);
    setLocked(true);
    if (correct) {
      setBananas((b) => b + 1);
    }
  };

  const nextQuestion = () => {
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

  // Target screen size wrapper for design fidelity
  const containerStyle = {
    width: 1512,
    height: 982,
    margin: '0 auto',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-50 to-white py-6 px-4 md:py-10 md:px-8" style={containerStyle}>
      <div className="space-y-6">
        <Hero />

        <MonkeyScore bananas={bananas} goal={5} />

        <QuestionCard
          prompt={question.prompt}
          onSelect={handleSelect}
          disabled={locked}
          correctLetter={lastWasCorrect}
          feedbackKey={`${index}-${locked}-${lastWasCorrect}`}
        />

        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-orange-900/70"
          >
            Tip: Collect 5 bananas to make the monkey smile big!
          </motion.div>

          <Controls
            onNext={nextQuestion}
            onRepeat={repeatQuestion}
            onSpeak={speakPrompt}
            canNext={locked}
          />
        </div>

        <footer className="text-center text-xs text-orange-900/60 pt-2">Designed for ages 4–6 • Friendly micro-interactions • Learn by play</footer>
      </div>
    </div>
  );
};

export default App;
