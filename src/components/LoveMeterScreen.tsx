import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function LoveMeterScreen({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHolding) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!);
            return 100;
          }
          return prev + 1; // Fast fill, 100% in 2.5s
        });
      }, 25);
    } else {
      // If user lets go, it slowly decreases
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1; // Decreases slightly slower
        });
      }, 35);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  }, [progress, onNext]);

  const startHolding = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (progress < 100) {
      setIsHolding(true);
    }
  };

  const stopHolding = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsHolding(false);
  };

  const getStatusText = () => {
    if (progress === 0) return 'Tahan tombol di bawah...';
    if (progress < 25) return 'Masih dikit... 🥺';
    if (progress < 50) return 'Terus tahan... 😘';
    if (progress < 80) return 'Hampir sampai! 🥰';
    if (progress < 100) return 'Dikit lagi! 😍';
    return 'Penuh! 💖';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex flex-col items-center justify-center p-8 max-w-lg w-full mx-auto text-center h-screen select-none"
    >
      <p className="text-[10px] tracking-[0.3em] text-[#e6a88b]/80 uppercase font-sans mb-6 font-bold flex items-center justify-center gap-2">
        <Heart className="w-3 h-3 fill-current" /> LOVE METER <Heart className="w-3 h-3 fill-current" />
      </p>

      <h2 className="text-4xl md:text-5xl font-sans font-black text-white mb-12 drop-shadow-md leading-tight tracking-wide">
        Seberapa Sayang<br />Kamu Sama Aku?
      </h2>

      <motion.div 
        animate={isHolding && progress < 100 ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ repeat: isHolding ? Infinity : 0, duration: 0.5 }}
        className="relative w-48 h-48 md:w-56 md:h-56 mb-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      >
        {/* Empty outline heart */}
        <svg viewBox="0 0 24 24" className="w-full h-full text-white/10 fill-transparent stroke-current" strokeWidth="0.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>

        {/* Filled heart, clipped */}
        <div 
          className="absolute inset-0 overflow-hidden transition-all duration-75"
          style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-[#e6a88b] fill-current" strokeWidth="0">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </motion.div>

      <div className="h-16 mb-8">
        <h3 className="text-2xl font-black text-white mb-2 font-sans drop-shadow-sm">{progress}%</h3>
        <p className="text-sm text-rose-200/80 font-sans italic drop-shadow-sm">
          {getStatusText()}
        </p>
      </div>

      <button
        onMouseDown={startHolding}
        onMouseUp={stopHolding}
        onMouseLeave={stopHolding}
        onTouchStart={startHolding}
        onTouchEnd={stopHolding}
        className="px-8 py-3.5 font-bold text-sm tracking-wide text-[#e6a88b] font-sans transition-all rounded-full border border-[#e6a88b]/40 hover:bg-[#e6a88b]/10 active:scale-95 active:bg-[#e6a88b]/20 flex items-center justify-center gap-3 w-full max-w-[280px]"
        style={{ touchAction: 'manipulation', WebkitUserSelect: 'none' }}
      >
        <Heart className="w-4 h-4 fill-current" /> Tahan buktiin cintamu 👆
      </button>
    </motion.div>
  );
}
