import { motion } from 'motion/react';

export function LetterCoverScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      className="relative z-10 flex flex-col items-center justify-center p-8 max-w-md w-full mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200/20 text-center min-h-[50vh]"
    >
      <motion.p className="text-sm md:text-base tracking-[0.3em] text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] uppercase font-sans mb-8 font-bold">
        A Love Letter For You
      </motion.p>
      
      <motion.h2 className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-pink-200 to-rose-400 mb-8 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)] py-2 leading-tight font-semibold italic">
        Your Special Day
      </motion.h2>
      
      <motion.p className="text-rose-50 font-sans italic mb-12 text-lg drop-shadow-sm tracking-wide">
        Created with love, just for you
      </motion.p>
      
      <motion.button 
        onClick={onNext} 
        className="px-10 py-4 font-bold text-rose-900 transition-all rounded-full bg-gradient-to-r from-rose-100 to-pink-100 hover:from-white hover:to-white active:scale-95 shadow-[0_0_20px_rgba(255,228,230,0.4)]"
      >
        READ MY LETTER
      </motion.button>
    </motion.div>
  );
}
