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
import { LoveMeterScreen } from './components/LoveMeterScreen';
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
    <div className="min-h-screen bg-[#251b1b] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4a3230] via-[#2a1d1c] to-[#140c0c] flex items-center justify-center overflow-hidden font-sans text-slate-100 relative">
      
      {/* Dreamy Bokeh Orbs */}
      <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-rose-300/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-orange-200/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-pink-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-overlay"></div>

      <FloatingHearts />

      <div className="relative z-10 w-full px-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <LockScreen key="lock" passcode={config.passcode} onUnlock={() => setStep(1)} />
          )}
          {step === 1 && (
            <LoveMeterScreen key="love" onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <GiftScreen key="gift" onNext={() => setStep(3)} />
          )}
          {step === 3 && (
            <LetterCoverScreen key="cover" onNext={() => setStep(4)} />
          )}
          {step === 4 && (
            <TypingMessageScreen key="typing" title={config.finalTitle} message={config.finalMessage} partyName={config.partyName || "Natan 22th Birthday"} onNext={() => setStep(5)} />
          )}
          {step === 5 && (
            <FinalScreen key="final" title={config.outroTitle || "Happy Birthday"} message={config.outroMessage || "Thank you for being part of my life.\n\nI hope this little gift can make your special day even more beautiful.\n\nForever Yours. ❤️"} onReplay={() => setStep(0)} />
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
