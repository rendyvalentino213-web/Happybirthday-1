import { useState, useEffect, useRef } from 'react';
import { Settings, Music, VolumeX } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { GalaxyBackground } from './components/GalaxyBackground';
import { LockScreen } from './components/LockScreen';
import { GiftScreen } from './components/GiftScreen';
import { LetterCoverScreen } from './components/LetterCoverScreen';
import { TypingMessageScreen } from './components/TypingMessageScreen';
import { FinalScreen } from './components/FinalScreen';
import { EditModal } from './components/EditModal';
import { PasswordModal } from './components/PasswordModal';
import { LoveMeterScreen } from './components/LoveMeterScreen';
import { BirthdayConfig } from './types';
import { defaultConfig, getConfigFromUrl } from './utils';

export default function App() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<BirthdayConfig>(defaultConfig);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setConfig(getConfigFromUrl());
    setIsLoaded(true);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden font-sans text-slate-100 relative">
      <GalaxyBackground theme={config.theme || 'rose'} />

      <div className="relative z-10 w-full px-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <LockScreen key="lock" passcode={config.passcode} theme={config.theme || 'rose'} onUnlock={() => setStep(1)} />
          )}
          {step === 1 && (
            <LoveMeterScreen key="love" theme={config.theme || 'rose'} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <GiftScreen key="gift" theme={config.theme || 'rose'} onNext={() => setStep(3)} />
          )}
          {step === 3 && (
            <LetterCoverScreen key="cover" theme={config.theme || 'rose'} onNext={() => setStep(4)} isPlaying={isPlaying} onToggleAudio={toggleAudio} />
          )}
          {step === 4 && (
            <TypingMessageScreen key="typing" title={config.finalTitle} message={config.finalMessage} partyName={config.partyName || "Natan 22th Birthday"} photoUrl={config.photoUrl} theme={config.theme || 'rose'} onNext={() => setStep(5)} />
          )}
          {step === 5 && (
            <FinalScreen key="final" title={config.outroTitle || "Happy Birthday"} message={config.outroMessage || "Thank you for being part of my life.\n\nI hope this little gift can make your special day even more beautiful.\n\nForever Yours. ❤️"} theme={config.theme || 'rose'} onReplay={() => setStep(0)} />
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setIsPasswordModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white/50 hover:text-white transition-all shadow-lg"
        title="Edit Ucapan"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* Audio Toggle Button */}
      <button
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white/50 hover:text-white transition-all shadow-lg"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Music className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      <PasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsEditing(true);
        }} 
      />

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
