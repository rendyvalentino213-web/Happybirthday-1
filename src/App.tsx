import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { FloatingHearts } from './components/FloatingHearts';
import { LockScreen } from './components/LockScreen';
import { GiftScreen } from './components/GiftScreen';
import { LetterCoverScreen } from './components/LetterCoverScreen';
import { TypingMessageScreen } from './components/TypingMessageScreen';
import { FinalScreen } from './components/FinalScreen';
import { EditModal } from './components/EditModal';
import { BirthdayConfig } from './types';
import { defaultConfig, getConfigFromUrl } from './utils';

export default function App() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<BirthdayConfig>(defaultConfig);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setConfig(getConfigFromUrl());
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/60 via-gray-950 to-black flex items-center justify-center overflow-hidden font-sans text-slate-100">
      <FloatingHearts />

      <div className="relative z-10 w-full px-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <LockScreen key="lock" passcode={config.passcode} onUnlock={() => setStep(1)} />
          )}
          {step === 1 && (
            <GiftScreen key="gift" onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <LetterCoverScreen key="cover" onNext={() => setStep(3)} />
          )}
          {step === 3 && (
            <TypingMessageScreen key="typing" title={config.finalTitle} message={config.finalMessage} onNext={() => setStep(4)} />
          )}
          {step === 4 && (
            <FinalScreen key="final" onReplay={() => setStep(0)} />
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white/50 hover:text-white transition-all shadow-lg"
        title="Edit Ucapan"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isEditing && (
        <EditModal
          currentConfig={config}
          onClose={() => setIsEditing(false)}
          onSave={(newConfig) => {
            setConfig(newConfig);
            setStep(0); // Reset to test new config
          }}
        />
      )}
    </div>
  );
}
